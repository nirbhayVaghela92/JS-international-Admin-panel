import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { ParmasTypeForBadge } from "@/utils/types";
import toast from "react-hot-toast";

export const createBadge = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.post(API.createDeleteBadge, body);
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

export const getBadgesList = async (params: ParmasTypeForBadge) => {
  const { search, page, limit, status, badgeType } = params;
  let response;
  try {
    response = await apiClient.get(API.listBadges, {
      params: {
        ...(badgeType && badgeType !== "all" && { type: badgeType }),
        search,
        status,
        page,
        limit,
      }
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

export const updateBadge = async (body: FormData) => {
  let response;
  try {
    const id = body.get("id");
    response = await apiClient.put(API.updateBadge(Number(id!)), body);
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

export const deleteBadges = async ({ id }: { id: number }) => {
  let response;
  try {
    response = await apiClient.delete(API.createDeleteBadge, { data: { id } });
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

export const changeBadgesStatus = async ({
  id,
  status,
}: {
  id: number;
  status: "inactive" | "active";
}) => {
  let response;
  try {
    response = await apiClient.put(API.updateBadgeStatus(id), { id, status });
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
