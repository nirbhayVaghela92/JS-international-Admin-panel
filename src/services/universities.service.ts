import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { UniversitySchemaType } from "@/utils/schemas";
import { ParmasType } from "@/utils/types";
import toast from "react-hot-toast";

export const getUniversitiesList = async (body: ParmasType) => {
    let response;
    try {
        response = await apiClient.post(API.universitiesList, body);
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

export const getUniversityPostsList = async (body: ParmasType) => {
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

export const getUniversityLeaderboard = async (params: ParmasType) => {
    let response;
    try {
        response = await apiClient.post(API.universityLeaderboard, params);
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

export const deleteUniversity = async (id: number) => {
    let response;
    try {
        response = await apiClient.delete(API.universityEditOrDelete(id));
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

export const changeUniversityStatus = async (id: number, status: "active" | "inactive") => {
    let response;
    try {
        response = await apiClient.put(API.changeUniversityStatus(id), {
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

export const createUniversity = async (body: FormData) => {
    let response;
    try {
        response = await apiClient.post(API.createUniversity, body);
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

export const editUniversity = async (id: number, body: FormData) => {
    let response;
    try {
        response = await apiClient.put(API.universityEditOrDelete(id), body);
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

export const removeUserFromUniversity = async (university_id: number, user_id: number) => {
    let response;
    try {
        response = await apiClient.post(API.removeUserFromUniversity, {
            university_id,
            user_id
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
}
