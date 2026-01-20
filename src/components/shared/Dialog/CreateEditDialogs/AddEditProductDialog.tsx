"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import InputGroup from "@/components/custom-elements/InputGroup";
import { CustomButton } from "@/components/custom-elements/button";
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import UploadZone from "@/components/shared/Uploadzone/Uploadzone";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateProduct, useUpdateProduct } from "@/hooks/queries";
import { useGetDropdowns } from "@/hooks/useGetDropdowns";
import { ProductSchema, ProductSchemaType } from "@/utils/schemas";

interface AddEditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  productDetails?: any | null;
}

export const AddEditProductDialog = ({
  isOpen,
  onClose,
  mode,
  productDetails,
}: AddEditProductDialogProps) => {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const { mutateAsync: createProduct, isPending: isCreating } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();

  const { categoryDropdown } = useGetDropdowns({
    isCategoryDropdown: true,
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    mode: "onChange",
    resolver: yupResolver(ProductSchema),
    defaultValues: {
      product_id: "",
      name: "",
      category: undefined,
      price: 0,
      cover_image: undefined,
      images: [],
      color_variants: [],
      description: "",
    },
  });

  const {
    fields: colorFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "color_variants",
  });

  const onSubmit = async (data: ProductSchemaType) => {
    const formData = new FormData();

    formData.append("productCode", data.product_id);
    formData.append("productName", data.name);
    formData.append("category", data.category!);
    formData.append("price", data.price.toString());

    if (data.cover_image) {
      formData.append("coverImage", data.cover_image as Blob);
    }

    if (data.images?.length) {
      data.images.forEach((img) => formData.append("images", img as Blob));
    }

    if (data.color_variants?.length) {
      formData.append("color_variants", JSON.stringify(data.color_variants));
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

    reset();
    onClose();
  };

  /* ================= Edit Mode ================= */
  useEffect(() => {
    if (mode === "edit" && productDetails) {
      reset({
        product_id: productDetails.productId,
        name: productDetails.name,
        category: productDetails.category,
        price: productDetails.price,
        color_variants: productDetails.color_variants || [],
        description: productDetails.description,
      });

      setCoverPreview(productDetails.cover_image || null);
    } else {
      reset();
      setCoverPreview(null);
    }
  }, [mode, productDetails, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          {/* Product ID & Name */}
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

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-4">
            <CustomDropdown
              label="Category"
              options={categoryDropdown!}
              value={watch("category") ?? ""}
              onChange={(val) => setValue("category", val as string)}
              error={!!errors.category}
              errorMessage={errors.category?.message}
            />

            <Input
              label="Price"
              type="number"
              {...register("price")}
              error={!!errors.price}
              errorMessage={errors.price?.message}
            />
          </div>

          {/* ================= Color Variants ================= */}
          <div className="grid gap-3">
            <label className="text-sm font-medium">
              Color Variants & Stock
            </label>

            {colorFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-3 rounded-md border p-3"
              >
                <input
                  type="color"
                  {...register(`color_variants.${index}.color`)}
                  className="h-10 w-14"
                />

                <Input
                  placeholder="#000000"
                  {...register(`color_variants.${index}.color`)}
                />

                <Input
                  type="number"
                  placeholder="Qty"
                  {...register(`color_variants.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  className="w-28"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ color: "#000000", quantity: 0 })}
              className="flex items-center gap-2 text-sm text-primary"
            >
              <FiPlus /> Add Color Variant
            </button>

            {errors.color_variants && (
              <p className="text-sm text-red-500">
                {errors.color_variants.message}
              </p>
            )}
          </div>

          {/* Cover Image */}
          <UploadZone
            name="cover_image"
            label="Cover Image"
            multiple={false}
            getValues={getValues}
            setValue={setValue}
            setPreview={setCoverPreview}
            preview={coverPreview ?? ""}
            error={errors.cover_image?.message}
            show
          />

          {/* Description */}
          <Textarea
            label="Description"
            {...register("description")}
            errorMessage={errors.description?.message}
          />

          <DialogFooter>
            <CustomButton
              type="button"
              variant="outline"
              label="Cancel"
              onClick={onClose}
            />
            <CustomButton
              type="submit"
              label={mode === "create" ? "Create" : "Update"}
              loading={isCreating || isUpdating}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
