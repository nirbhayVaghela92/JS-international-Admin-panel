import { FiltersTypes } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useGetData from "../useGetData";
import {
  changeProductStatus,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetails,
  getProductsList,
} from "@/services/products.service";
import { useValidatedQuery } from "../useValidatedQuery";

export const useGetProductList = (params: FiltersTypes) => {
  const { status, page, limit, search, sort_by, sort_order, category } = params;
  const res = useGetData({
    params: {
      status,
      limit: limit || 10,
      deleted: false,
      ...(search && { search }),
      ...(sort_by && { sort_by }),
      ...(sort_order && { sort_order }),
      ...(category && { category }),
    },
    page: page || 1,
    queryKey: "useGetProductList",
    fn: getProductsList,
  });
  return res;
};

export const useGetProductDetails = (slug: string, enable: boolean = true) => {
  const response = useQuery({
    queryKey: ["useGetProductDetails", slug, enable],
    queryFn: async () => {
      const res = await getProductDetails(slug);
      return res;
    },
    enabled: !!enable,
  });
  return useValidatedQuery(response);
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

  const response = useMutation({
    mutationKey: ["useDeleteProduct"],
    mutationFn: async (id: number) => {
      const res = await deleteProduct({ id });
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

// Change product status
export const useChangeProductStatus = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useChangeProductStatus"],
    mutationFn: async ({ id, status }: { id: number; status: 0 | 1 }) => {
      const res = await changeProductStatus({ id, status });
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
