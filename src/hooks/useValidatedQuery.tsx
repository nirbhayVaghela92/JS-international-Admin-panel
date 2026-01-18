import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useValidatedQuery = (
  queryResult: any,
  isInfinteQuery: boolean = false,
) => {
  const router = useRouter();
  
  useEffect(() => {
    if (!queryResult.isLoading) {
      const status =
        queryResult?.data?.data?.success ||
        queryResult?.data?.pages?.[0]?.data.success;
        
      if (!status || status === "false") {
        router.replace(routes.dashboard);
      }
    }
  }, [queryResult.data, queryResult.isLoading]);

  return isInfinteQuery
    ? queryResult
    : {
        data: queryResult?.data?.data,
        isLoading: queryResult.isLoading,
        isPending: queryResult.isPending,
      };
};
