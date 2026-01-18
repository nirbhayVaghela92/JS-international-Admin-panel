"use client";

import { ProductForm } from "./ProductForm";
import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import Link from "next/link";

interface AddEditProductClientProps {
  isEditMode?: boolean;
}

export function AddEditProductClient({
  isEditMode = false,
}: AddEditProductClientProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl py-8">
        <Breadcrumb
          pageName={isEditMode ? "Edit Product" : "Add Product"}
          breadcrumbTrail={
            <>
              <Link
                href="/products"
                className="transition hover:text-foreground"
              >
                Products
              </Link>
              <span className="mx-2">/</span>
              <span className="font-medium text-foreground">
                {isEditMode ? "Edit" : "Add"} Product
              </span>
            </>
          }
        />

        {/* Form */}
        <ProductForm />
      </div>
    </main>
  );
}

export default AddEditProductClient;
