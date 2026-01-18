"use client";
import { FiltersTypes } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

interface UseGetDataParams {
  params: FiltersTypes; // Dynamic filters as key-value pairs
  queryKey: string;
  limit?: number;
  page: number;
  fn: (params: FiltersTypes) => Promise<any>;
}

const useGetData = ({ params, queryKey, fn, page }: UseGetDataParams) => {
  const [currentPage, setCurrentPage] = useState(page);

  // Keep track of previous filters to detect changes
  const prevFilters: any = useRef(params);

  // Reset page if page change
  useEffect(() => {
    setCurrentPage(page || 1);
  }, [page]);

  useEffect(() => {
    const filtersChanged = Object.keys(params).some(
      (key) =>
        prevFilters.current[key as keyof FiltersTypes] !==
        params[key as keyof FiltersTypes],
    );

    if (filtersChanged) {
      setCurrentPage(1); // Reset to page 1 if filters change
      prevFilters.current = params;
    }
  }, [params]);

  const response = useQuery({
    queryKey: [queryKey, ...Object.values(params), currentPage], // Dynamic query key
    queryFn: async () => {
      const queryParams = {
        ...params, // Spread the dynamic filters
        page: currentPage || 1,
        limit: params.limit || 15,
      };

      const res = await fn(queryParams); // Make the dynamic API call
      return res;
    },
    placeholderData: keepPreviousData,
  });

  return response;
};

export default useGetData;
