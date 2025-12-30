import {
  getAppDownloadLink,
  getCityList,
  getConfigDetails,
  getCountryList,
  getDashbaoardData,
  getStateList,
  getUniversityStateList,
} from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCountryList = ({ enabled }: { enabled: boolean }) => {
  const response = useQuery({
    queryKey: ["useGetCountryList"],
    queryFn: async () => {
      const res = await getCountryList();
      return res?.data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return response;
};

export const useGetStateList = ({
  enabled,
  country_id,
}: {
  enabled: boolean;
  country_id: string;
}) => {
  const response = useQuery({
    queryKey: ["useGetStateList", country_id],
    queryFn: async () => {
      const res = await getStateList(country_id);
      return res?.data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled,
  });

  return response;
};

export const useGetCityList = ({
  enabled,
  state_id,
  country_id,
  search,
}: {
  enabled: boolean;
  state_id: string;
  country_id: string;
  search?: string;
}) => { 
  const response = useQuery({
    queryKey: ["useGetCityList", state_id, country_id, search],
    queryFn: async () => {
      const res = await getCityList({ state_id, country_id, search });
      return res?.data?.data;
    },
    // refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 60, // 1 hour
    enabled,
  });

  return response;
};

export const useGetDashboardData = () => {
  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: ["useGetDashboardData"],
    queryFn: async () => {
      const res = await queryClient.fetchQuery({
        queryKey: ["getDashbaoardData"],
        queryFn: async () => {
          const res = await getDashbaoardData();
          return res?.data?.data;
        },
      });
      return res;
    },
    // refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 60, // 1 hour
  });

  return response;
}

export const useGetDownloadLink = () => {
  const response = useQuery({
    queryKey: ["useGetDownloadLink"],
    queryFn: async () => {
      const res = await getAppDownloadLink();
      return res?.data?.data;
    },
  });

  return response;
}

export const useUniversityStateList = ({ enabled }: { enabled: boolean }) => {
  const response = useQuery({
    queryKey: ["useUniversityStateList"],
    queryFn: async () => {
      const res = await getUniversityStateList();
      return res?.data?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: enabled,
  });

  return response;
}

export const useGetConfigDetails = () => {
  const response = useQuery({
    queryKey: ["useGetConfigDetails"],
    queryFn: async () => {
      const res = await getConfigDetails();
      return res?.data?.data;
    },
  });

  return response;
}