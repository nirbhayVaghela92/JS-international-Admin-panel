"use client";
import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import { CustomButton } from "@/components/custom-elements/button";
import { AddEditProductDialog } from "@/components/shared/Dialog/CreateEditDialogs/AddEditProductDialog";
import ProductList from "@/components/shared/Tables/product-table/ProductList";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Breadcrumb
        pageName="Products"
        lastButton={
          <CustomButton
            onClick={() => {
              setIsDialogOpen(true);
            }}
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
