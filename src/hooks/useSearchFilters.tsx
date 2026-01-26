import { useRouter, useSearchParams } from "next/navigation";

const useSearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const setParam = (
    params: URLSearchParams,
    key: string,
    value?: string | number,
  ) => {
    if (value === undefined || value === "" || value === null) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  };

  const updateSearchParams = (key: string, value: any) => {
    const params = new URLSearchParams(searchParams.toString());

    setParam(params, key, value);
    // setParam(params, "page", 1); // reset pagination on filter change

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const clearFiltersWithSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    Array.from(params.keys()).forEach((key) => {
      if (key !== "page") {
        params.delete(key);
      }
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { setParam, updateSearchParams, clearFiltersWithSearchParams };
};
export default useSearchFilters;
