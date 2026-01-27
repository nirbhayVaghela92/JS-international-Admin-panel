/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignInSchemaType } from "@/utils/schemas";
import { apiClient } from "../utils/api/apiClient";
import { API } from "@/utils/api/apiUrl";
import { errorHandler } from "@/utils/helpers";
import toast from "react-hot-toast";

export const signIn = async (body: SignInSchemaType) => {
  let response;
  try {
    response = await apiClient.post(API.signin, body);
    if (response.status === 200) {
      toast.success(response?.data?.message ?? "Signed in successfully. Welcome to the admin panel.");
    }
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ??
        "Something went wrong. Please try again.",
    );
    // errorHandler(response.status);
  }
  return response;
};

export const sendForgotPasswordOtp = async (body: { email: string }) => {
  let response;
  try {
    response = await apiClient.post(API.sendForgotPasswordOtp, body);
    toast.success(response.data.message || "OTP sent to your email address.");
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message || "Failed to send OTP. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

export const verifyForgotPasswordOtp = async (body: {
  email: string;
  otp: string;          
}) => {
  let response;
  try {
    response = await apiClient.post(API.verifyForgotPasswordOtp, body);
    toast.success(response.data.message || "OTP verified successfully.");
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ||
        "Failed to verify OTP. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

export const resetPassword = async (body: {
  email: string;
  new_password: string;
  confirm_password: string;
}) => {
  let response;
  try {
    response = await apiClient.post(API.resetPassword, body);
    toast.success(
      response.data.message ||
        "Password reset successfully. You can now login.",
    );
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ||
        "Failed to reset password. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

export const changePassword = async (body: {
  currentPassword: string;
  newPassword: string;
}) => {
  let response;
  try {
    response = await apiClient.put(API.changePassword, body);
    toast.success(response.data.message || "Password changed successfully.");
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ||
        "Failed to change password. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

export const editProfile = async (body: FormData) => {
  let response;
  try {
    response = await apiClient.put(API.editAdminProfile, body);
    toast.success(response.data.message || "Profile updated successfully.");
  } catch (error: any) {
    response = error.response;
    toast.error(
      error?.response?.data?.message ||
        "Failed to update profile. Please try again.",
    );
    errorHandler(response.status);
  }
  return response;
};

// export const addProfileImageUpload = async (body: FormData) => {
//   let response;
//   try {
//     response = await apiClient.post(addProfileImageApi, body);
//   } catch (error: any) {
//     response = error.response;
//     errorHandler(response.status););
//   }
//   return response;
// };

// export const removeProfileImageUpload = async () => {
//   let response;
//   try {
//     response = await apiClient.get(removeProfileImageApi);
//   } catch (error: any) {
//     response = error.response;
//     errorHandler(response.data.statusCode);
//   }
//   return response;
// };
