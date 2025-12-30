import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { ParmasType, UserType } from "@/utils/types";
import toast from "react-hot-toast";

export const getUsersList = async (body: ParmasType) => {
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

export const getUserFollowerList = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getUserFollowerList, {
      ...body,
      user_id: body.id,
      keyword: body.search,
    });
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

export const getUserFollowingList = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getUserFollowingList, {
      ...body,
      user_id: body.id,
      keyword: body.search,
    });
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

export const addRemoveBadge = async ({
  id,
  trophy_names,
  userType,
}: {
  id: number;
  trophy_names: string[];
  userType: UserType;
}) => {
  let response;
  try {
    response = await apiClient.post(API.addRemoveBadge, {
      user_id: id,
      trophy_name: trophy_names,
      user_type: userType,
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

export const addRemovePoints = async ({
  id,
  points,
  category,
  userType,
}: {
  id: number;
  points: number;
  category: string;
  userType: UserType;
}) => {
  let response;
  try {
    response = await apiClient.post(API.addRemovePoints, {
      user_id: id,
      points,
      category,
      user_type: userType,
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

export const exportUsersCSV = async () => {
  let response;
  try {
    response = await apiClient.get(API.exportUsersCSV, {
      responseType: "blob",
    });
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
  }
  return response;
};

export const getUserBussinessList = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getUserBussinessList, {
      user_id: body?.userId,
    });
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
