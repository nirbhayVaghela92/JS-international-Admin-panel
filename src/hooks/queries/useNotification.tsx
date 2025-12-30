import { deleteNotification, getNotificationList, sendNotification } from "@/services";
import { NotificationSchemaType } from "@/utils/schemas";
import { ParmasType } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useGetData from "@/hooks/useGetData";
import { useValidatedQuery } from "../useValidatedQuery";

export const useSendNotificaion = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useCreateNotificaion"],
    mutationFn: async (body: NotificationSchemaType) => {
      const res = await sendNotification(body);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetNotificationList"],
      });
    },
  });
  return response;
};

export const useGetNotificationList = (params: ParmasType) => {
  const { search, page, limit } = params;

  const res = useGetData({
    params: {
      search,
      limit: limit || 15,
    },
    page: page || 1,
    queryKey: "useGetNotificationList",
    fn: getNotificationList,
  });

  return useValidatedQuery(res);
};
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useDeleteNotification"],
    mutationFn: async (id: number) => {
      const res = await deleteNotification({ id });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetNotificationList"],
      });
    },
  });
  return response;
};