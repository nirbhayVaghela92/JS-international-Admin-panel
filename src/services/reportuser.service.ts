import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { ParmasType } from "@/utils/types";
import toast from "react-hot-toast";

export const getReportedUserList = async (body: ParmasType) => {
    let response;
    try {
        response = await apiClient.post(API.getReportedUsersList, body);
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

export const getReportedUserDetails = async (userId: number) => {
    let response;
    try {
        response = await apiClient.get(API.getReportedUserDetails(userId));
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

export const updateUserReportStatus = async (body: {
    user_id: number;
    status: "blocked" | "solved";
    solution_reason: string;
}) => {
    let response;
    try {
        response = await apiClient.post(API.updateReportedUserStatus, body);
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

