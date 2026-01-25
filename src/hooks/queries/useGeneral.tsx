import { FiltersTypes } from "@/utils/types";
import useGetData from "../useGetData";
import { listSupportQueries } from "@/services";

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
  return res;
};