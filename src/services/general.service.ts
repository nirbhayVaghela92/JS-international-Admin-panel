import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import toast from "react-hot-toast";

export const getAdminDetailsById = async (id: number) => {
  let response;
  try {
    response = await apiClient.get(`${API.adminDetails}/${id}`);
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

export const getConfigDetails = async () => {
  let response;
  try {
    response = await apiClient.get(API.getConfigs);
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

export const getCountryList = async () => {
  let response;
  try {
    response = await apiClient.get(API.getCountryList);
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

export const getStateList = async (country_id: string) => {
  let response;
  try {
    response = await apiClient.post(API.getStateList, {
      country_id: Number(country_id),
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

export const getCityList = async ({
  state_id,
  country_id,
  search,
}: {
  state_id: string;
  country_id: string;
  search?: string;
}) => {
  let response;
  try {
    response = await apiClient.post(API.getCityList, {
      state_id: Number(state_id),
      country_id: Number(country_id),
      ...(search ? { search } : {}),
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

export const getDashbaoardData = async () => {
  let response;
  try {
    response = await apiClient.get(API.getDashbaoardData);
    // if (response.status === 200) {
    //   toast.success("Dashboard data loaded successfully");
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

export const getAppDownloadLink = async () => {
  let response;
  try {
    response = await apiClient.get(API.getAppDownloadLink);
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
      "Something went wrong. Please try again.",
    );
  }
  return response;
}

export const getUniversityStateList = async () => {
  let response;
  try {
    response = await apiClient.get(API.getUniversityStateList);
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