import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { ParmasType } from "@/utils/types";
import toast from "react-hot-toast";

export const getUsersPosts = async (body: ParmasType) => {
  let response;
  try {
    response = await apiClient.post(API.getUsersPostList, body);
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

export const getUsersPostDetails = async (id: number) => {
  let response;
  try {
    response = await apiClient.post(API.getUserPostDetails, {
      post_id: id,
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

export const getUsersPostCommentList = async (
  body: ParmasType & { post_id: number },
) => {
  let response;
  try {
    response = await apiClient.post(API.getUsersPostCommentList, body);
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

export const changePostStatus = async ({
  id,
  status,
}: {
  id: number;
  status: "A" | "I";
}) => {
  let response;
  try {
    response = await apiClient.post(API.changePostStatus, {
      post_id: id,
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

export const deleteUserPost = async ({ id }: { id: number }) => {
  let response;
  try {
    response = await apiClient.delete(API.deleteUserPost(id));
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

export const getUsersReportedPostsList = async (
  body: ParmasType & {
    status?: "pending" | "solved" | "blocked";
  },
) => {
  let response;
  try {
    response = await apiClient.post(API.getUserReportedPostList, body);
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

export const getUserReportedPostDetails = async (id: number) => {
  let response;
  try {
    response = await apiClient.get(API.getUserReportedPostDetails(id));
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

export const changeReportedPostStatus = async ({
  id,
  status,
  reason,
}: {
  id: number;
  status: "solved" | "blocked";
  reason: string; 
}) => {
  let response;
  try {
    response = await apiClient.post(API.changeReportedPostStatus, {
      post_id: id,
      status,
      solution_reason: reason,
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

export const createAnnoucementsPost = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.post(API.createAnnoucementsPost, body);
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
}

export const editAnnoucementsPost = async (id: number, body: FormData) => {
  let response;
  try {
    response = await apiClient.put(API.editDeleteAnnoucementsPost(id), body);
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
}

export const deleteAnnoucementPost = async ({ id }: { id: number }) => {
  let response;
  try {
    response = await apiClient.delete(API.editDeleteAnnoucementsPost(id));
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

export const checkVideoStatus = async ({ id }: { id: number }) => {
  let response;
  try {
    response = await apiClient.post(API.checkVideostatus, {
      post_id: id
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

export const updateGlobalPostsConfig = async (body: { global_post_points: number }) => {
  let response;
  try {
    response = await apiClient.put(API.updateGlobalPostsConfig, body);
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
}