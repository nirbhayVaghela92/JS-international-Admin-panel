import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { NotificationSchemaType } from "@/utils/schemas";
import { ParmasType } from "@/utils/types";
import toast from "react-hot-toast";

export const sendNotification = async (body: NotificationSchemaType) => {
  let response;
  try {
    response = await apiClient.post(API.sendNotification, body);
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


export const getNotificationList = async (params: ParmasType) => {
  const { search, page, limit } = params;
  let response;
  try {
    response = await apiClient.post(API.listNotification, {
      search,
      page,
      limit,
    });
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

export const deleteNotification = async ({ id }: { id: number }) => {
  let response;
  try {
    response = await apiClient.delete(API.deleteNotification(id));
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

