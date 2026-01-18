import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { FiltersTypes} from "@/utils/types";
import toast from "react-hot-toast";

export const getUsersList = async (body: FiltersTypes) => {
  let response;
  try {
    response = await apiClient.post(API.getUsersList, body);
    // if (response.status === 200) {
    //   toast.success(response.data.message);
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

export const getUsersDetails = async (body: { user_id: number }) => {
  let response;
  try {
    response = await apiClient.post(API.getUsersDetails, body);
    // if (response.status === 200) {
    //   toast.success(response.data.message);
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

export const changeUserStatus = async ({
  id,
  status,
}: {
  id: number;
  status: "A" | "I";
}) => {
  let response;
  try {
    response = await apiClient.post(API.changeUserStatus, {
      user_id: id,
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

export const updateUserDetails = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.put(API.updateUserDetails, body);
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

export const deleteUser = async ({ id }: { id: number }) => {
  let response;
  try {
    response = await apiClient.delete(API.deleteUser, {
      data: {
        user_id: id,
      },
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

