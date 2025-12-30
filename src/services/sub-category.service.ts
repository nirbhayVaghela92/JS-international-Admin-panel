import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { ParmasType } from "@/utils/types";
import toast from "react-hot-toast";

export const getCategoryDropdown = async (params: ParmasType) => {
  const { master_post_category_id } = params;
  let response;
  try {
    response = await apiClient.post(API.getCategory, {
      master_post_category_id,
    });
    // if (response.status === 200) {
    //   toast.success("Categories loaded successfully");
    // }
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

export const createCategory = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.post(API.createCategory, body);
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

export const getCategory = async (params: ParmasType) => {
  const { master_post_category_id, userType } = params;
  let response;
  try {
    response = await apiClient.post(API.getCategory, {
      master_post_category_id,
      user_type: userType,
    });
    // if (response.status === 200) {
    //   toast.success("Categories loaded successfully");
    // }
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

export const getCategoryById = async (id: string) => {
  let response;
  try {
    response = await apiClient.get(`${API.getCategoryById}/${id}`);
    // if (response.status === 200) {
    //   toast.success("Category details loaded successfully");
    // }
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

export const getSubCategopryDetails = async (id: number) => {
  let response;
  try {
    response = await apiClient.get(API.getSubCategopryDetails(id));
    // if (response.status === 200) {
    //   toast.success("Sub-category details loaded successfully");
    // }
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
}

export const updateCategory = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.put(API.updateCategory, body);
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

export const deleteCategory = async (id: number) => {
  let response;
  try {
    response = await apiClient.delete(API.deleteCategory, {
      data: { id },
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

export const changeCategoryStatus = async ({
  id,
  status,
}: {
  id: number;
  status: "A" | "I";
}) => {
  let response;
  try {
    response = await apiClient.post(API.changeCategoryStatus, { id, status });
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


export const changeSubCategoryOrder = async ({
  post_id,
  order,
}: {
  post_id: number;
  order: number;
}) => {
  let response;
  try {
    response = await apiClient.post(API.changeSubCategoryOrder, { post_id, order });
    if (response.status === 200) toast.success(response.data.message);
  } catch (error: any) {
    response = error.response;
    toast.error(error?.response?.data?.message ?? "Something went wrong.");
    errorHandler(response.status);
  }
  return response;
};

