/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  changePassword,
  editProfile,
  resetPassword,
  sendForgotPasswordOtp,
  signIn,
  verifyForgotPasswordOtp,
} from "@/services";
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
      currentPassword: string;
      newPassword: string;
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
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["useGetAdminDetails"],
    //   });
    // },
  });
  return response;
};

