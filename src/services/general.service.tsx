import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { FiltersTypes } from "@/utils/types";
import toast from "react-hot-toast";

export const listSupportQueries = async (body: FiltersTypes) => {
  let response;
  try {
    response = await apiClient.get(API.getSupportQueriesList, { params: body });
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