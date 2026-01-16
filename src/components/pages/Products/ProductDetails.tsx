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
import { useRouter } from "next/navigation";

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

// Mock product data - replace with actual data fetching
const mockProduct = {
  id: "1",
  name: "Casio Youth Watch",
  description:
    "Premium quality youth watch with digital display and water resistance. Perfect for everyday wear with modern design.",
  productCode: "CYW-2024-001",
  category: "Watches",
  price: 2999,
  coverImage: "/watch-product.jpg",
  images: [
    {
      id: "1",
      url: "/watch-front.png",
      alt: "Front view",
    },
    {
      id: "2",
      url: "/watch-side.png",
      alt: "Side view",
    },
    {
      id: "3",
      url: "/watch-back.png",
      alt: "Back view",
    },
  ],
  variants: [
    {
      id: "black",
      color: "Black",
      hex: "#000000",
      stock: 45,
    },
    {
      id: "blue",
      color: "Blue",
      hex: "#1e40af",
      stock: 32,
    },
    {
      id: "red",
      color: "Red",
      hex: "#dc2626",
      stock: 28,
    },
  ],
  totalStock: 105,
};

export default function ProductDetailsPage({
  id,
}: {
    id: number 
}) {
  const router = useRouter();
  const product = mockProduct;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const getTotalStock = () => {
    return product.variants.reduce((sum, variant) => sum + variant.stock, 0);
  };

  const getLowStockVariants = () => {
    return product.variants.filter((v) => v.stock < 30);
  };

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
                  src={product.coverImage || "/placeholder.svg"}
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
                {product.images.map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted ring-primary transition-all hover:ring-2"
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Title and Code */}
            <div>
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <div className="mb-4 flex items-center gap-3">
                <Badge variant="outline">{product.category}</Badge>
                <Badge variant="secondary">{product.productCode}</Badge>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {product.description}
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
                    <span className="text-2xl font-bold">₹{product.price}</span>
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
                        {getLowStockVariants().map((variant) => (
                          <p
                            key={variant.id}
                            className="text-sm text-muted-foreground"
                          >
                            {variant.color}:{" "}
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
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>

              {/* Grid View */}
              <TabsContent value="grid" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {product.variants.map((variant) => (
                    <Card
                      key={variant.id}
                      className={`cursor-pointer transition-all ${
                        selectedVariant?.id === variant.id
                          ? "ring-2 ring-primary"
                          : "hover:border-primary"
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{variant.color}</h3>
                            {variant.stock < 30 && (
                              <Badge variant="danger" className="text-xs">
                                Low Stock
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-8 w-8 rounded-full border-2 border-border shadow-sm"
                              style={{ backgroundColor: variant.hex }}
                              title={variant.hex}
                            />
                            <span className="text-sm text-muted-foreground">
                              {variant.hex}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 border-t pt-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Stock
                            </span>
                            <span className="text-lg font-bold">
                              {variant.stock}
                            </span>
                          </div>
                        </div>

                        {/* Stock Bar */}
                        <div className="pt-2">
                          <div className="h-2 w-full rounded-full bg-secondary">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                variant.stock > 50
                                  ? "bg-green-500"
                                  : variant.stock > 20
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{
                                width: `${Math.min((variant.stock / 100) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Table View */}
              <TabsContent value="table">
                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Color</TableHead>
                        <TableHead>Hex Code</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.variants.map((variant) => (
                        <TableRow
                          key={variant.id}
                          className="transition-colors hover:bg-muted/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div
                                className="h-6 w-6 rounded-full border-2 border-border"
                                style={{ backgroundColor: variant.hex }}
                              />
                              <span className="font-medium">
                                {variant.color}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {variant.hex}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-lg font-bold">
                              {variant.stock}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {variant.stock > 50 && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                In Stock
                              </Badge>
                            )}
                            {variant.stock > 20 && variant.stock <= 50 && (
                              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                                Medium Stock
                              </Badge>
                            )}
                            {variant.stock <= 20 && (
                              <Badge variant="danger">Low Stock</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
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
                  <span className="font-mono font-semibold">
                    {product.productCode}
                  </span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Total Variants</span>
                  <span className="font-bold">{product.variants.length}</span>
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
                  <span className="text-muted-foreground">Product Price</span>
                  <span className="text-lg font-bold">₹{product.price}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Applies To</span>
                  <span className="font-medium">
                    All {product.variants.length} Color Variants
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
