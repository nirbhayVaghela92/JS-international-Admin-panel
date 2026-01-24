import AddProductClient from "@/components/pages/Products/AddEditProduct";

export const metadata = {
  title: "Edit Product",
  description: "Edit an existing product in the store",
};

function EditProductPage() {
  return <AddProductClient mode="edit"/>;
}

export default EditProductPage;
