"use client";

import { ProductForm } from "./ProductForm";
import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import Link from "next/link";

interface AddEditProductClientProps {
  mode?: "edit" | "create";
}

export function AddEditProductClient({
  mode,
}: AddEditProductClientProps) {
  return (
    <main className="min-h-screen bg-background p-5">
      <div className="mx-auto max-w-4xl py-8">
        <Breadcrumb
          pageName={mode === "edit" ? "Edit Product" : "Add Product"}
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
                {mode === "edit" ? "Edit" : "Add"} Product
              </span>
            </>
          }
        />

        {/* Form */}
        <ProductForm mode={mode}/>
      </div>
    </main>
  );
}

export default AddEditProductClient;
