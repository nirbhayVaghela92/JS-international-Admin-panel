
import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { ParmasType } from "@/utils/types";
import toast from "react-hot-toast";

export const getGroupsList = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getGroupsList, {
      page: body?.page,
      limit: body?.limit,
      keyword: body?.search,
    });
    // if (response.status === 200) {
    //   toast.success(response.data.message);
    // }
  } catch (error: any) {
    response = error.response;
    // toast.error(
    //   error?.response?.data?.message ??
    //     "Something went wrong. Please try again.",
    // );
    errorHandler(response.status);
  }
  return response;
};

export const getGroupPosts = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getGroupPosts, {
      group_id: body?.group_id,
      page: body?.page,
      limit: body?.limit,
      keyword: body?.search,
    });
    // if (response.status === 200) {
    //   toast.success(response.data.message);
    // }
  } catch (error: any) {
    response = error.response;
    // toast.error(
    //   error?.response?.data?.message ??
    //     "Something went wrong. Please try again.",
    // );
    errorHandler(response.status);
  }
  return response;
};

export const getGroupLeaderboard = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getGroupLeaderboard, body);
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

export const deleteGroup = async (id: number) => {
  let response;
  try {
    response = await apiClient.post(API.deleteGroup, {
      group_id: id,
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
