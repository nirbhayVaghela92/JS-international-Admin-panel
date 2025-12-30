/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  changePassword,
  editProfile,
  resetPassword,
  sendForgotPasswordOtp,
  signIn,
  verifyForgotPasswordOtp,
} from "@/services";
import { getAdminDetailsById } from "@/services/general.service";
import { SignInSchemaType } from "@/utils/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSignIn = () => {
  const response = useMutation({
    mutationKey: ["useSignIn"],
    mutationFn: async (body: SignInSchemaType) => {
      const res = await signIn(body);
      return res;
    },
  });
  return response;
};

export const useChangePassword = () => {
  const response = useMutation({
    mutationKey: ["useChangePassword"],
    mutationFn: async (body: {
      current_password: string;
      new_password: string;
      confirm_new_password: string;
    }) => {
      const res = await changePassword(body);
      return res;
    },
  });
  return response;
};

export const useSendForgotPasswordOtp = () => {
  return useMutation({
    mutationKey: ["useSendForgotPasswordOtp"],
    mutationFn: async (body: { email: string }) => {
      const response = await sendForgotPasswordOtp(body);
      return response;
    },
  });
};

export const useVerifyForgotPasswordOtp = () => {
  return useMutation({
    mutationKey: ["useVerifyForgotPasswordOtp"],
    mutationFn: async (body: { email: string; otp: string }) => {
      const response = await verifyForgotPasswordOtp(body);
      return response;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["useResetPassword"],
    mutationFn: async (body: {
      email: string;
      new_password: string;
      confirm_password: string;
    }) => {
      const response = await resetPassword(body);
      return response;
    },
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useEditProfile"],
    mutationFn: async (body: FormData) => {
      const res = await editProfile(body);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetAdminDetails"],
      });
    },
  });
  return response;
};

export const useGetAdminDetails = () => {
  const response = useMutation({
    mutationKey: ["useGetAdminDetails"],
    mutationFn: async (id:number) => {
      const res = await getAdminDetailsById(id);
      return res?.data?.data;
    },
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // gcTime: 30 * 60 * 1000, // 30 minutes
    // refetchOnWindowFocus: false, // don't refetch when window/tab regains focus
  });
  return response;
};

// export const useAddProfileImage = () => {
//   const response = useMutation({
//     mutationKey: ["useAddProfileImage"],
//     mutationFn: async (body: FormData) => {
//       const res = await addProfileImageUpload(body);
//       return res;
//     },
//   });
//   return response;
// }

// export const useRemoveProfileImage = () => {
//   const response = useMutation({
//     mutationKey: ["useremoveProfileImage"],
//     mutationFn: async () => {
//       const res = await removeProfileImageUpload();
//       return res;
//     },
//   });
//   return response;
// }
