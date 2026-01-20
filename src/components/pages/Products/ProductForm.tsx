"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiPlus, FiTrash2, FiImage, FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductSchema, ProductSchemaType } from "@/utils/schemas";
import { CustomButton } from "@/components/custom-elements/button";
import UploadZone from "@/components/shared/Uploadzone/Uploadzone";
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import { useGetDropdowns } from "@/hooks/useGetDropdowns";
import { useParams, useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import {
  useCreateProduct,
  useGetProductDetails,
  useUpdateProduct,
} from "@/hooks/queries";
import { getDrodopwnValueFromLabel } from "@/utils/helpers/commonHelpers";

const CATEGORIES = ["Men's Watch", "Women's Watch", "Purses", "Jewellery"];

interface ProductFormProps {
  mode?: "create" | "edit";
}

export function ProductForm({ mode }: ProductFormProps) {
  const router = useRouter();
  const { slug } = useParams();
  const { categoryDropdown } = useGetDropdowns({
    isCategoryDropdown: true,
  });
  const { data: productDetails } = !!slug
    ? useGetProductDetails(String(slug), !!slug)
    : { data: null };
  const { mutateAsync: createProduct, isPending: isCreating } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();

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
      color_variants: [{ color: "#000000", quantity: 0 }],
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

  const colorVariants = watch("color_variants");

  const handleColorChange = (index: number, color: string) => {
    setValue(`color_variants.${index}.color`, color);
  };

  const handleFormSubmit = async (data: ProductSchemaType) => {
    console.log(data, "data");
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
      formData.append("colorStock", JSON.stringify(data.color_variants));
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

    // reset();
    router.push(routes.products.list());
  };

  useEffect(() => {
    if (productDetails && categoryDropdown) {
      reset({
        product_id: productDetails?.product?.code,
        name: productDetails?.product?.name,
        category: getDrodopwnValueFromLabel(
          productDetails?.product?.category_name,
          categoryDropdown,
        ),
        price: productDetails?.product?.price,
        description: productDetails?.product?.description || "",
        cover_image: productDetails?.product?.cover_image || undefined,
        images: productDetails?.product?.images || [],
        color_variants: productDetails?.product?.color_variants?.length
          ? productDetails?.product?.color_variants
          : [{ color: "#000000", quantity: 0 }],
      });
    }
  }, [productDetails, categoryDropdown]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Basic Information
        </h2>
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="product_id" className="mb-2 block">
                Product ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="product_id"
                placeholder="e.g., PRD-001"
                {...register("product_id")}
                className={errors.product_id ? "border-destructive" : ""}
              />
              {errors.product_id && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.product_id.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="name" className="mb-2 block">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter product name"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <CustomDropdown
              placeholder="Select Product Category"
              label="Category"
              options={categoryDropdown!}
              value={watch("category") ?? ""}
              onChange={(val) => setValue("category", val as string)}
              error={!!errors.category}
              errorMessage={errors.category?.message}
            />

            <div>
              <Label htmlFor="price" className="mb-2 block">
                Price <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price", { valueAsNumber: true })}
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter product description (max 500 characters)"
              {...register("description")}
              rows={4}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Cover Image */}
      <UploadZone
        name="cover_image"
        label="Cover Image"
        multiple={false}
        getValues={getValues}
        setValue={setValue}
        title="Upload Product Cover Image"
        // setPreview={setCoverPreview}
        // preview={coverPreview ?? ""}
        error={errors.cover_image?.message}
        show
        maxFiles={5}
      />
      {/* Cover Image */}
      {/* <Card className="p-6">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Cover Image
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="relative flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-border px-6 py-4 transition-colors hover:border-primary hover:bg-primary/5 flex-1">
              <FiUpload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload cover image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
            </label>
          </div>
          {coverPreview && (
            <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
              <img
                src={coverPreview || "/placeholder.svg"}
                alt="Cover preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          {errors.cover_image && (
            <p className="text-sm text-destructive">{errors.cover_image.message}</p>
          )}
        </div>
      </Card> */}

      {/* Product Image */}
      <UploadZone
        name="images"
        label="Product Images"
        multiple={true}
        getValues={getValues}
        setValue={setValue}
        title="Upload product images"
        description="(Maximum 5 images, PNG, JPG, WEBP)"
        error={errors.images?.message}
        cancle={true}
        show
      />
      {/* <Card className="p-6">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Product Images
        </h2>
        <div className="space-y-4">
          <label className="relative flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-border px-6 py-4 transition-colors hover:border-primary hover:bg-primary/5">
            <FiImage className="h-5 w-5 text-muted-foreground" />
            <div>
              <span className="text-sm font-medium text-foreground">
                Upload product images
              </span>
              <p className="text-xs text-muted-foreground">
                (Maximum 5 images, PNG, JPG, WEBP)
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
              className="hidden"
            />
          </label>

          {Object.keys(imagePreviewsMap).length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {Object.entries(imagePreviewsMap).map(([index, preview]) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg border border-border"
                >
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Product preview ${Number(index) + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Card> */}

      {/* Color Variants */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Color Variants & Stock
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ color: "#000000", quantity: 0 })}
            className="gap-2"
          >
            <FiPlus className="h-4 w-4" />
            Add Variant
          </Button>
        </div>

        <div className="space-y-4">
          {colorFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-end gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <Label className="text-sm font-medium">Color</Label>
                <input
                  type="color"
                  value={colorVariants?.[index]?.color || "#000000"}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-border"
                />
              </div>

              <div className="flex-1">
                <Label
                  htmlFor={`color-hex-${index}`}
                  className="text-sm font-medium"
                >
                  Hex Code
                </Label>
                <Input
                  id={`color-hex-${index}`}
                  placeholder="#000000"
                  {...register(`color_variants.${index}.color`)}
                  className="mt-1"
                />
              </div>

              <div className="w-24">
                <Label
                  htmlFor={`quantity-${index}`}
                  className="text-sm font-medium"
                >
                  Quantity
                </Label>
                <Input
                  id={`quantity-${index}`}
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register(`color_variants.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  className="mt-1"
                />
              </div>

              {colorFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <FiTrash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {errors.color_variants && (
            <p className="text-sm text-destructive">
              {typeof errors.color_variants === "string"
                ? errors.color_variants
                : "Please add at least one color variant"}
            </p>
          )}
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 pt-6">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <CustomButton type="submit" disabled={isCreating || isUpdating}>
          {isCreating
            ? "Creating Product..."
            : isUpdating
              ? "Updating Product..."
              : "Create Product"}
        </CustomButton>
      </div>
    </form>
  );
}
