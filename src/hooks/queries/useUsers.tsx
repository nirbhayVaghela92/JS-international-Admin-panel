"use client";
import { routes } from "@/constants/routes";
import {
  addRemoveBadge,
  addRemovePoints,
  changeUserStatus,
  deleteUser,
  exportUsersCSV,
  getUserFollowerList,
  getUserFollowingList,
  getUsersDetails,
  getUsersList,
  updateUserDetails,
} from "@/services";
import { ParmasType, UserType } from "@/utils/types";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { notFound, redirect, useRouter } from "next/navigation";
import useGetData from "@/hooks/useGetData";
import { useValidatedQuery } from "../useValidatedQuery";

export const useGetUsersList = (params: ParmasType) => {
  const { status, page, limit, search, sort_by, sort_order, region } = params;
  const res = useGetData({
    params: {
      status,
      limit: limit || 10,
      ...(search && { search }),
      ...(sort_by && { sort_by }),
      ...(sort_order && { sort_order }),
      ...(region && { region_id: region }),
    },
    page: page || 1,
    queryKey: "useGetUsersList",
    fn: getUsersList,
  });
  return useValidatedQuery(res);
};

export const useGetUserFollowerList = (
  params: ParmasType,
  enabled: boolean = true,
) => {
  const { search, limit, page, id } = params;

  const response = useInfiniteQuery({
    queryKey: ["useGetUserFollowerList", search, limit, page, id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getUserFollowerList({
        limit,
        id,
        page: pageParam,
        ...(search ? { search } : {}),
      });
      return res;
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.data?.pagination;
      if (pagination?.page < pagination?.total_pages) {
        return pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    enabled,
  });

  return response;
};

export const useGetUserFollowingList = (
  params: ParmasType,
  enabled: boolean = true,
) => {
  const { search, limit, page, id } = params;

  const response = useInfiniteQuery({
    queryKey: ["useGetUserFollowingList", search, limit, page, id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getUserFollowingList({
        limit,
        id,
        page: pageParam,
        ...(search ? { search } : {}),
      });
      return res;
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.data?.pagination;
      if (pagination?.page < pagination?.total_pages) {
        return pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    enabled,
  });

  return response;
};

export const useGetUserDetails = (user_id: number) => {
  const response = useQuery({
    queryKey: ["useGetUsersList", user_id],
    queryFn: async () => {
      const res = await getUsersDetails({
        user_id,
      });
      return res;
    },
  });
  return useValidatedQuery(response);
};

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useChangeUserStatus"],
    mutationFn: async ({ id, status }: { id: number; status: "A" | "I" }) => {
      const res = await changeUserStatus({ id, status });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetUsersList"],
      });
    },
  });
  return response;
};

export const useUpdateUserDetails = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useUpdateUserDetails"],
    mutationFn: async (body: FormData) => {
      const res = await updateUserDetails(body);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetUsersList"],
      });
    },
  });
  return response;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useDeleteUser"],
    mutationFn: async (id: number) => {
      const res = await deleteUser({ id });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetUsersList"],
      });
    },
  });
  return response;
};

export const useAddRemovePoints = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useAddRemovePoints"],
    mutationFn: async ({
      id,
      points,
      category,
      userType,
    }: {
      id: number;
      category: string;
      points: number;
      userType: UserType;
    }) => {
      const res = await addRemovePoints({ id, category, points, userType });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetUsersList"],
      });
    },
  });
  return response;
};

export const useAddRemoveBadge = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useAddRemoveBadge"],
    mutationFn: async ({
      id,
      trophy_names,
      userType,
    }: {
      id: number;
      trophy_names: string[];
      userType: UserType;
    }) => {
      const res = await addRemoveBadge({ id, trophy_names, userType });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetUsersList"],
      });
    },
  });
  return response;
};

export const useExportUsersDataCSV = () => {
  const response = useMutation({
    mutationKey: ["useExportUsersDataCSV"],
    mutationFn: async () => {
      const res = await exportUsersCSV();
      return res;
    },
  });

  return response;
};
