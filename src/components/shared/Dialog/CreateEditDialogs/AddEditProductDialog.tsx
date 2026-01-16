"use client";

import InputGroup from "@/components/custom-elements/InputGroup";
import { CustomButton } from "@/components/custom-elements/button";
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadZone from "@/components/shared/Uploadzone/Uploadzone";
import { useCreateProduct, useUpdateProduct } from "@/hooks/queries";
import { ProductSchema, ProductSchemaType } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetDropdowns } from "@/hooks/useGetDropdowns";

interface AddEditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  productDetails?: any | null;
}

export const AddEditProductDialog = ({
  isOpen,
  mode,
  onClose,
  productDetails,
}: AddEditProductDialogProps) => {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string>();

  const { mutateAsync: createProduct, isPending: isCreatingProduct } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct();

  const { categoryDropdown } = useGetDropdowns({
    isCategoryDropdown: true,
  });

  const {
    control,
    getValues,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    mode: "onChange",
    defaultValues: {
      product_id: "",
      name: "",
      category: undefined,
      price: 0,
      quantity: 0,
      cover_image: undefined,
      images: [],
      color_options: "",
      description: "",
    },
    resolver: yupResolver(ProductSchema),
  });

  const productId = watch("product_id");
  const name = watch("name");
  const category = watch("category");
  const price = watch("price");
  const quantity = watch("quantity");
  const colorOptions = watch("color_options");

  const onSubmit = async (data: ProductSchemaType) => {
    const formData = new FormData();

    formData.append("productCode", data.product_id);
    formData.append("productName", data.name);
    formData.append("category", data.category!);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());

    if (data.cover_image) {
      formData.append("coverImage", data.cover_image as Blob);
    }

    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        formData.append(`images`, image as Blob);
      });
    }

    // Convert comma-separated string to array
    if (data.color_options) {
      const colorsArray = data.color_options
        .split(",")
        .map((color) => color.trim())
        .filter((color) => color.length > 0);
      formData.append("color_options", JSON.stringify(colorsArray));
    }

    if (data.description) {
      formData.append("description", data.description);
    }

    if (mode === "edit" && productDetails) {
      formData.append("id", productDetails.id);
      await updateProduct(formData);
    } else {
      await createProduct(formData);
    }

    onClose();
    reset();
  };

  useEffect(() => {
    if (mode === "edit" && productDetails) {
      reset({
        product_id: productDetails.productId || "",
        name: productDetails.name || "",
        category: productDetails.category || undefined,
        price: productDetails.price || 0,
        quantity: productDetails.quantity || 0,
        cover_image: productDetails.cover_image,
        images: productDetails.images || [],
        color_options: productDetails.color_options?.join(", ") || "",
        description: productDetails.description || "",
      });

      if (productDetails.cover_image) {
        setCoverPreview(productDetails.cover_image);
      }
      if (productDetails.images?.length > 0) {
        setImagesPreview(productDetails.images);
      }
    } else {
      reset({
        product_id: "",
        name: "",
        category: undefined,
        price: 0,
        quantity: 0,
        cover_image: undefined,
        images: [],
        color_options: "",
        description: "",
      });
      setCoverPreview(null);
      setImagesPreview("");
    }
  }, [mode, productDetails, reset]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          setCoverPreview(null);
          setImagesPreview("");
          onClose();
        }
      }}
    >
      <DialogContent
        className="max-h-[85vh] overflow-y-auto border-none sm:max-w-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          const target = e.target as Element;
          if (target.closest("[data-radix-popper-content-wrapper]")) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modaldatascroll grid gap-6 py-4"
        >
          {/* Product ID and Name */}
          <div className="grid grid-cols-2 gap-4">
            <InputGroup
              autoComplete="off"
              className="w-full"
              type="text"
              label="Product ID"
              placeholder="Enter product ID (e.g., PRD-001)"
              error={!!errors.product_id}
              errorMessage={errors.product_id?.message}
              {...register("product_id")}
            />

            <InputGroup
              autoComplete="off"
              className="w-full"
              type="text"
              label="Product Name"
              placeholder="Enter product name"
              error={!!errors.name}
              errorMessage={errors.name?.message}
              {...register("name")}
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 gap-4">
            <CustomDropdown
              label="Category"
              placeholder="Select category"
              width="w-full"
              options={
                categoryDropdown || [
                  { label: "Men's Watch", value: "Men's Watch" },
                  { label: "Women's Watch", value: "Women's Watch" },
                  { label: "Purses", value: "Purses" },
                  { label: "Jewellery", value: "Jewellery" },
                ]
              }
              error={!!errors.category}
              errorMessage={errors.category?.message}
              showClearButton={false}
              value={category ?? ""}
              onChange={(option) => {
                setValue("category", option as string);
              }}
            />
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              placeholder="Enter price"
              type="text"
              value={price || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(value)) {
                  setValue("price", value ? parseFloat(value) : 0);
                }
              }}
              className="w-full"
              autoComplete="off"
              error={!!errors.price}
              errorMessage={errors.price?.message}
            />

            <Input
              label="Quantity"
              placeholder="Enter quantity"
              type="text"
              value={quantity || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setValue("quantity", value ? parseInt(value) : 0);
                }
              }}
              className="w-full"
              autoComplete="off"
              error={!!errors.quantity}
              errorMessage={errors.quantity?.message}
            />
          </div>

          {/* Color Options */}
          <div className="grid grid-cols-1 gap-4">
            <InputGroup
              autoComplete="off"
              className="w-full"
              type="text"
              label="Color Options"
              placeholder="Enter colors separated by commas (e.g., Black, Brown, Gold)"
              error={!!errors.color_options}
              errorMessage={errors.color_options?.message}
              {...register("color_options")}
            />
          </div>

          {/* Cover Image Upload */}
          <div className="grid grid-cols-1 gap-4">
            <UploadZone
              name="cover_image"
              label="Cover Image"
              multiple={false}
              getValues={getValues}
              setValue={setValue}
              error={errors?.cover_image?.message}
              show={true}
              setPreview={setCoverPreview}
              preview={coverPreview ?? ""}
            />
          </div>

          {/* Related Images Upload */}
          <div className="grid grid-cols-1 gap-4">
            <UploadZone
              name="images"
              label="Related Images (Multiple)"
              multiple={true}
              getValues={getValues}
              setValue={setValue}
              error={errors?.images?.message}
              show={true}
              setPreview={setImagesPreview}
              // preview={imagesPreview}
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 gap-4">
            <Textarea
              label="Description"
              className="border-gray-300 focus:border-primary focus:ring-primary"
              errorMessage={errors.description?.message}
              {...register("description")}
              placeholder="Add product description"
              rows={4}
            />
          </div>

          <DialogFooter>
            <CustomButton
              type="button"
              onClick={() => {
                reset();
                setCoverPreview(null);
                setImagesPreview("");
                onClose();
              }}
              variant="outline"
              label="Cancel"
            />

            <CustomButton
              type="submit"
              label={mode === "create" ? "Create Product" : "Update Product"}
              loading={isCreatingProduct || isUpdatingProduct}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
