import { routes } from "@/constants/routes";
import { apiClient } from "@/utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import { ParmasType } from "@/utils/types";
import toast from "react-hot-toast";

export const createContest = async (body: FormData) => {
    let response;
    try {
        response = await apiClient.post(API.createContest, body);
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

export const editContest = async (body: FormData) => {
    let response;
    try {
        response = await apiClient.put(API.editContest, body);
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


export const getContestList = async (body: ParmasType) => {
    let response;
    try {
        response = await apiClient.post(API.getContestList, body);
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

export const getContestDetails = async ({ id }: { id: number }) => {
    let response;
    try {
        response = await apiClient.get(API.getContestDetails(id));
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

export const deleteContest = async (id: number) => {
    let response;
    try {
        response = await apiClient.delete(API.deleteContest(id), {
            data: { id },
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

export const changeContestStatus = async ({
    id,
    status,
}: { id: number; status: "active" | "inactive" }) => {
    let response;
    try {
        response = await apiClient.put(API.changeContestStatus(id), {
            status
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

export const changeContestUserPostStatus = async ({
    id,
    status,
}: { id: number; status: "active" | "inactive" }) => {
    let response;
    try {
        response = await apiClient.put(API.changeContestUserPostStatus(id), {
            status
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

// Charity APIs
export const createCharity = async (body: any) => {
    let response;
    try {
        response = await apiClient.post(API.createCharity, body);
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
export const editCharity = async (body: any) => {
    let response;
    try {
        response = await apiClient.put(API.editCharity, body);
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

export const deleteCharity = async (id: number) => {
    let response;
    try {
        response = await apiClient.delete(API.deleteCharity(id), {
            data: { id },
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

export const getCharityList = async (body: ParmasType) => {
    let response;
    try {
        response = await apiClient.post(API.listCharities, body);
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

export const changeCharityStatus = async ({
    id,
    status,
}: { id: number; status: "active" | "inactive" }) => {
    let response;
    try {
        response = await apiClient.put(API.changeCharityStatus(id), {
            status
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

export const toggelContestSettings = async ({
    id,
    show_days_left,
    is_badge_auto_assign
}: {
    id: number;
    show_days_left?: boolean;
    is_badge_auto_assign?: boolean;
}) => {
    let response;
    try {
        response = await apiClient.put(API.toggelContestSettings(id), {
            ...(typeof show_days_left === "boolean" && { show_days_left }),
            ...(typeof is_badge_auto_assign === "boolean" && { is_badge_auto_assign }),
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

export const getContestUserPostList = async (body: ParmasType & { contest_id: number }) => {
    let response;
    try {
        response = await apiClient.post(API.listContestUserPost, body);
        // if (response.status === 200) {
        //   toast.success(response.data.message);
        // }
    } catch (error: any) {
        response = error.response;
        // toast.error(
        //     error?.response?.data?.message ??
        //     "Something went wrong. Please try again.",
        // );
        errorHandler(response.status);
    }
    return response;
};

export const getContestUserPostDetails = async ({ id }: { id: number }) => {
    let response;
    try {
        response = await apiClient.post(API.getContestUserPostDetails, {
            post_id: id
        });
    } catch (error: any) {
        response = error.response;
        // if (response.status === 404 && response.message === "Post not found.") {
        //     window.location.href = routes.dashboard;
        //     return;
        // }
        toast.error(
            error?.response?.data?.message ??
            "Something went wrong. Please try again.",
        );
        errorHandler(response.status);
    }
    return response;
};

export const getContestUserPostComments = async (body: ParmasType & { post_id: number }) => {
    let response;
    try {
        response = await apiClient.post(API.getContestUserPostComments, {
            page: body.page,
            limit: body.limit,
            contest_post_id: body.post_id
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

export const getContestLeaderboard = async (body: ParmasType & { contest_id: number }) => {
    let response;
    try {
        response = await apiClient.post(API.getContestLeaderboard, body);
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

export const getContestantsList = async (body: ParmasType & { contest_id: number }) => {
    let response;
    try {
        response = await apiClient.post(API.listContestantsLists, body);
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

export const getContestantBoostList = async (body: ParmasType & { contestant_post_id: number }) => {
    let response;
    try {
        response = await apiClient.post(API.listBoosterList, body);
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