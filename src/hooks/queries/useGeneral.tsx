import { FiltersTypes, QueryStatusType } from "@/utils/types";
import useGetData from "../useGetData";
import { chnageQueryStatus, getDashboardData, listSupportQueries } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetSupportQueryList = (params: FiltersTypes) => {
  const { status, page, limit, search, sort_by, sort_order, category } = params;
  const res = useGetData({
    params: {
      status,
      limit: limit || 10,
      // deleted: false,
      ...(search && { search }),
      ...(sort_by && { sort_by }),
      ...(sort_order && { sort_order }),
    //   ...(category && { category }),
    },
    page: page || 1,
    queryKey: "useGetSupportQueryList",
    fn: listSupportQueries,
  });
  return {
    ...res,
    data: res?.data?.data
  };
};

export const useGetDashboardData = () => {
  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: ["useGetDashboardData"],
    queryFn: async () => {
      const res = await queryClient.fetchQuery({
        queryKey: ["getDashbaoardData"],
        queryFn: async () => {
          const res = await getDashboardData();
          return res?.data;
        },
      });
      return res;
    },
    // refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 60, // 1 hour
  });

  return response;
}

export const useChangeQueryStatus = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useChangeQueryStatus"],
    mutationFn: async ({ id, status }: { id: number; status: QueryStatusType }) => {
      const res = await chnageQueryStatus({ id, status});
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetSupportQueryList"],
      });
    },
  });
  return response;
};