import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { FiltersTypes } from "@/utils/types";
import toast from "react-hot-toast";

export const getProductsList = async (body: FiltersTypes) => {
  let response;
  try {
    response = await apiClient.post(API.productsList, body);
    // if (response.status === 200) {
    //   toast.success(response.data.message);
    // }
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
    console.log(response, "reponse")
    errorHandler(response.status);
  }
  return response;
};

export const editProduct = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.put(
      API.editProduct(Number(body.get("id"))),
      body,
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

export const createProduct = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.post(API.createProduct, body);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

export const changeProductStatus = async ({
  id,
  status,
}: {
  id: number;
  status: 1 | 0;
}) => {
  let response;
  try {
    response = await apiClient.put(API.changeProductStatus(id), {
      status,
    });
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

export const deleteProduct = async ({ id }: { id: number }) => {
  let response;
  try {
    response = await apiClient.delete(API.deleteProduct(id));
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

export const getProductDetails = async (slug: string) => {
  let response;
  try {
    response = await apiClient.get(API.productDetails(slug));
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};
