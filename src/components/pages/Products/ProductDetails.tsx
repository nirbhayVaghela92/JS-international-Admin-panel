"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ImageIcon, Palette, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useGetProductDetails } from "@/hooks/queries";
import { Loader } from "@/components/custom-elements/Loader";
import { formatPrice, getFullImageUrl } from "@/utils/helpers/commonHelpers";
import { cn } from "@/lib/utils";

interface ProductVariant {
  id: string;
  color: string;
  hex: string;
  stock: number;
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { data: product, isLoading } = useGetProductDetails(String(slug));

  const router = useRouter();
  const coverImage = product?.images?.find((img: any) => img.is_primary);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const getTotalStock = () => {
    return product?.variants.reduce(
      (sum: any, variant: any) => sum + variant.stock,
      0,
    );
  };

  const getLowStockVariants = () => {
    return product?.variants.filter((v: any) => v.stock < 30);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center gap-4">
          <div
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </div>
        </div>

        {/* Main Product Info */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Product Images */}
          <div className="space-y-4 lg:col-span-1">
            {/* Cover Image */}
            <Card className="overflow-hidden">
              <div className="flex aspect-square items-center justify-center bg-muted">
                <img
                  src={coverImage?.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>

            {/* Thumbnail Images */}
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <ImageIcon className="h-4 w-4" />
                Product Gallery
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {product?.images?.map((image: any, index: number) =>
                  image?.is_primary ? null : (
                    <div
                      key={index}
                      className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted ring-primary transition-all hover:ring-2"
                    >
                      <img
                        src={image?.image_url}
                        alt={product?.product?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Title and Code */}
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                {product?.product?.name}
              </h1>
              <div className="mb-4 flex items-center gap-3">
                <Badge variant="outline">
                  {product?.product?.category_name ?? "Uncategorized"}
                </Badge>
                <Badge variant="secondary">{product?.product?.code ?? "Unknown"}</Badge>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {product?.product?.description}
              </p>
            </div>

            {/* Price Section */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Price Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Product Price:
                    </span>
                    <span className="text-2xl font-bold">
                      {formatPrice(Number(product?.product?.price ?? 0))}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Same price for all color variants (Inclusive of all taxes)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stock Overview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-4 w-4" />
                  Stock Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Stock:</span>
                    <span className="text-xl font-bold text-primary">
                      {getTotalStock()} units
                    </span>
                  </div>
                  {getLowStockVariants().length > 0 && (
                    <div className="border-t pt-2">
                      <p className="mb-2 text-xs font-semibold text-destructive">
                        ⚠️ Low Stock Variants:
                      </p>
                      <div className="space-y-1">
                        {getLowStockVariants().map((variant: any) => (
                          <p
                            key={variant.id}
                            className="text-sm text-muted-foreground flex gap-2"
                          >
                            <div
                              className="h-6 w-6 rounded-full border-2 border-border"
                              style={{
                                backgroundColor: variant?.color ?? "#FFFF",
                              }}
                            />{" "}
                            :{/* {variant.color}:{" "} */}
                            <span className="font-semibold text-destructive">
                              {variant.stock}
                            </span>{" "}
                            units
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Variants and Stock Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Variants & Stock Management
            </CardTitle>
            <CardDescription>
              Manage variants, colors, pricing, and stock levels for each
              variant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Color</TableHead>
                    <TableHead>Hex Code</TableHead>
                    <TableHead className="text-right">Stock</TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product?.variants.map((variant: any) => (
                    <TableRow
                      key={variant.id}
                      className="transition-colors hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className="h-6 w-6 rounded-full border-2 border-border"
                            style={{
                              backgroundColor: variant?.color ?? "#FFFF",
                            }}
                          />
                          <span className="font-medium">
                            {variant?.color ?? "#FFFF"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {variant?.color ?? "#FFFF"}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-lg font-bold">
                          {variant?.stock}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Product Code</span>
                  <span className={cn(product?.product?.code ? "font-semibold" : "font-normal")}>
                    {product?.product?.code ?? "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">
                    {product?.product?.category_name ?? "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Total Variants</span>
                  <span className="font-bold">{product?.variants.length}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Total Stock</span>
                  <span className="text-lg font-bold">
                    {getTotalStock()} units
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pricing Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Producpt Price</span>
                  <span className="text-lg font-bold">
                    {formatPrice(Number(product?.product?.price ?? 0))}
                  </span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Applies To</span>
                  <span className="font-medium">
                    All {product?.variants.length} Color Variants
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Tax Status</span>
                  <Badge variant="secondary">Inclusive</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
