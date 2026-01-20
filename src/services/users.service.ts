import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { EditUserDetailsSchemaType } from "@/utils/schemas";
import { FiltersTypes } from "@/utils/types";
import { fi } from "date-fns/locale";
import toast from "react-hot-toast";

export const getUsersList = async (body: FiltersTypes) => {
  let response;
  try {
    response = await apiClient.get(API.getUsersList, { params: body });
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
  status: 0 | 1;
}) => {
  let response;
  try {
    response = await apiClient.put(API.changeUserStatus(id), {
      active: status,
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
  
export const updateUserDetails = async (body: EditUserDetailsSchemaType & { id: number }) => {
  let response;
  try {
    response = await apiClient.put(API.editUser(body?.id), {
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone_number,
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

export const deleteUser = async ({ id }: { id: number }) => {
  let response;
  try {
    response = await apiClient.delete(API.deleteUser(id));
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
