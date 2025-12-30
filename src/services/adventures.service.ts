import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { ParmasType } from "@/utils/types";
import toast from "react-hot-toast";

// Create Adventure
export const createAdventure = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.post(API.createAdventurePost, body);
    if (response.status === 200) toast.success(response.data.message);
  } catch (error: any) {
    response = error.response;
    toast.error(error?.response?.data?.message ?? "Something went wrong.");
    errorHandler(response.status);
  }
  return response;
};

// Edit Adventure
export const editAdventure = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.put(API.updateAdventurePost, body);
    if (response.status === 200) toast.success(response.data.message);
  } catch (error: any) {
    response = error.response;
    toast.error(error?.response?.data?.message ?? "Something went wrong.");
    errorHandler(response.status);
  }
  return response;
};

// Get Adventure list
export const getAdventureList = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getAdventurePostList, body);
  } catch (error: any) {
    response = error.response;
    toast.error(error?.response?.data?.message ?? "Something went wrong.");
    errorHandler(response.status);
  }
  return response;
};

// Get single Adventure post
export const getAdventurePost = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getAdventurePost, body);
  } catch (error: any) {
    response = error.response;
    toast.error(error?.response?.data?.message ?? "Something went wrong.");
    errorHandler(response.status);
  }
  return response;
};

// Delete Adventure
export const deleteAdventure = async (id: number) => {
  let response;
  try {
    response = await apiClient.delete(API.deleteAdventure, { data: { id } });
    if (response.status === 200) toast.success(response.data.message);
  } catch (error: any) {
    response = error.response;
    toast.error(error?.response?.data?.message ?? "Something went wrong.");
    errorHandler(response.status);
  }
  return response;
};

// Change Adventure status
export const changeAdventureStatus = async ({
  id,
  status,
}: {
  id: number;
  status: "A" | "I";
}) => {
  let response;
  try {
    response = await apiClient.post(API.changeAdventureStatus, { id, status });
    if (response.status === 200) toast.success(response.data.message);
  } catch (error: any) {
    response = error.response;
    toast.error(error?.response?.data?.message ?? "Something went wrong.");
    errorHandler(response.status);
  }
  return response;
};

// Change Adventure order
export const changeAdventureOrder = async ({
  post_id,
  order,
}: {
  post_id: number;
  order: number;
}) => {
  let response;
  try {
    response = await apiClient.post(API.changeAdventureOrder, { post_id, order });
    if (response.status === 200) toast.success(response.data.message);
  } catch (error: any) {
    response = error.response;
    toast.error(error?.response?.data?.message ?? "Something went wrong.");
    errorHandler(response.status);
  }
  return response;
};
