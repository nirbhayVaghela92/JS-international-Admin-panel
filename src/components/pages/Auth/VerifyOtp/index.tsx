
"use client";
import { Logo } from "@/components/shared/logo";
import { CustomButton } from "@/components/custom-elements/button";
import { routes } from "@/constants/routes";
import {
  useSendForgotPasswordOtp,
  useVerifyForgotPasswordOtp,
} from "@/hooks/queries";
import { useAuthStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const VerifyOtp = () => {
  const router = useRouter();
  const { email, setToken } = useAuthStore();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const {
    mutateAsync: sendForgotPasswordOtp,
    isPending: isSendigForgotPasswordOtp,
  } = useSendForgotPasswordOtp();
  const { mutateAsync: verifyOtp, isPending: isVerifyingOtp } =
    useVerifyForgotPasswordOtp();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    // Allow only digits
    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    const res = await sendForgotPasswordOtp({ email });
    if (res.data.status === "true") {
      return;
    }
  };

  const handleVerifyOtp = async () => {
    const otpValues = inputRefs.current.map((input) => input?.value || "");

    // Check if all inputs are filled
    if (otpValues.some((value) => !value)) {
      toast.error("Please enter all OTP digits");
      return;
    }
    // Combine all digits into a single OTP string
    const otp = otpValues.join("");

    const res = await verifyOtp({ email, otp });
    if (res.data.status === "true") {
      setToken(res?.data?.data);
      Cookies.set("reset-password-token", res?.data?.data);
      router.push(routes.auth.resetPassword);
    }
  };

  useEffect(() => {
    // Auto-focus the first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (!email) {
      router.replace(routes.auth.signIn);
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg shadow-lg md:flex-row">
        {/* Form Section */}
        <div className="flex w-full flex-col justify-center bg-white p-8 md:w-1/2 md:p-12">
          {/* Back Button + Logo */}
          <div>
            <button
              onClick={() => router.push(routes.auth.forgotPassword)}
              className="mb-4 flex items-center text-sm font-medium text-purple-600 hover:underline focus:outline-none"
            >
              ← Back to Email
            </button>
            <Logo />
          </div>

          {/* OTP Input */}
          <div className="my-8">
            <label className="mb-2 block text-lg font-medium text-gray-700">
              Enter OTP
            </label>
            <div className="flex justify-between gap-4">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  pattern="\d*"
                  className="h-14 w-14 rounded-lg border border-gray-300 text-center text-2xl shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="my-6">
            <CustomButton
              onClick={handleVerifyOtp}
              loading={isVerifyingOtp}
              label="Verify"
              className="w-full py-5 text-lg font-medium text-white transition-all duration-300 hover:shadow-lg"
            />
          </div>

          {/* Resend */}
          <p className="text-center font-medium">
            Did't Recieve OTP ?
            <span
              className="cursor-pointer font-semibold text-purple-600 hover:underline dark:text-white"
              onClick={handleResendOtp}
            >
              {isSendigForgotPasswordOtp ? (
                <span className="mx-8 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-purple-600"></span>
              ) : (
                " RESEND OTP"
              )}
            </span>
          </p>
        </div>

        {/* Welcome Section */}
        <div className="hidden w-full flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-teal-400 p-8 text-center text-white md:flex md:w-1/2 md:p-12">
          <h1 className="mb-4 text-2xl font-bold md:text-3xl">
            OTP Verification
          </h1>
          <p className="opacity-90 md:px-6">
            A verification code has been sent to your email. Enter it to
            proceed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
