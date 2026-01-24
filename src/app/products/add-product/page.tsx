import { AddEditProductClient } from "@/components/pages/Products/AddEditProduct";

export const metadata = {
  title: "Add Product",
  description: "Add a new product to the store",
};

function AddProductPage() {
  return <AddEditProductClient mode="create"/>;
}

export default AddProductPage;
