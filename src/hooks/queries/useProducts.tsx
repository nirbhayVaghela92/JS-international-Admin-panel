import { FiltersTypes, ParmasType } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useGetData from "../useGetData";
import {
  createProduct,
  editProduct,
  getProductsList,
} from "@/services/products.service";
import { useValidatedQuery } from "../useValidatedQuery";

export const useGetProductList = (params: ParmasType) => {
  const { status, page, limit, search, sort_by, sort_order, region } = params;
  const res = useGetData({
    params: {
      status,
      limit: limit || 10,
      ...(search && { search }),
      ...(sort_by && { sort_by }),
      ...(sort_order && { sort_order }),
      ...(region && { region_id: region }),
    },
    page: page || 1,
    queryKey: "useGetProductList",
    fn: getProductsList,
  });
  return useValidatedQuery(res);
};

// Create product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useCreateProduct"],
    mutationFn: async (body: FormData) => {
      const res = await createProduct(body);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetProductList"],
      });
    },
  });
  return response;
};

// Update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useUpdateProductDetails"],
    mutationFn: async (body: FormData) => {
      const res = await editProduct(body);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetProductList"],
      });
    },
  });
  return response;
};

// Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete product");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete product");
    },
  });
};

// Change product status
export const useChangeProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: "A" | "I" }) => {
      const response = await fetch(`/api/products/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to change product status");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
      toast.success("Product status changed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to change product status");
    },
  });
};
