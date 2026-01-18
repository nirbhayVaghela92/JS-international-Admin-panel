"use client";
import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import { CustomButton } from "@/components/custom-elements/button";
import { AddEditProductDialog } from "@/components/shared/Dialog/CreateEditDialogs/AddEditProductDialog";
import ProductList from "@/components/shared/Tables/product-table/ProductList";
import { routes } from "@/constants/routes";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Products = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Breadcrumb
        pageName="Products"
        lastButton={
          <CustomButton
            onClick={() => router.push(routes.products.add)}
            type="button"
            label="Add Product"
            icon={<PlusIcon />}
          />
        }
      />
      <ProductList />
      {isDialogOpen && (
        <AddEditProductDialog
          productDetails={null}
          isOpen={true}
          mode="create"
          onClose={() => {
            setIsDialogOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Products;
