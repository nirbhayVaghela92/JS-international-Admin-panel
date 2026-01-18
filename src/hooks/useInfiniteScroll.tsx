/* eslint-disable react-hooks/exhaustive-deps */
import { FiltersTypes } from "@/utils/types";
import { RefObject, useCallback, useMemo } from "react";

interface useInfiniteScrollType {
  params: FiltersTypes;
  containerRef: RefObject<HTMLDivElement>;
  enabled?: boolean;
  fn?: any;
}

export function useInfiniteScroll({
  params,
  containerRef,
  enabled = true,
  fn,
}: useInfiniteScrollType) {
  const {
    data: response,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = fn(params, enabled);

  const data = useMemo(() => {
    return response?.pages?.flatMap((page: any) => {
      return (
        page?.data?.data?.data ||
        page?.data?.data?.contests ||
        page?.data?.data?.formattedComments ||
        page?.data?.data ||
        []
      );
    });
  }, [response]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    data,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    handleScroll,
  };
}
