"use client";
import {
  changeUserStatus,
  deleteUser,
  getUsersDetails,
  getUsersList,
  updateUserDetails,
} from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useGetData from "@/hooks/useGetData";
import { useValidatedQuery } from "../useValidatedQuery";
import { FiltersTypes } from "@/utils/types";
import { EditUserDetailsSchemaType } from "@/utils/schemas";

export const useGetUsersList = (params: FiltersTypes) => {
  const { status, page, limit, search, sort_by, sort_order } = params;
  const res = useGetData({
    params: {
      status,
      limit: limit || 10,
      ...(search && { search }),
      ...(sort_by && { sort_by }),
      ...(sort_order && { sort_order }),
    },
    page: page || 1,
    queryKey: "useGetUsersList",
    fn: getUsersList,
  });
  return useValidatedQuery(res);
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
    mutationFn: async ({ id, status }: { id: number; status: 0 | 1 }) => {
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
    mutationFn: async (body: EditUserDetailsSchemaType & { id: number }) => {
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
