"use client";
import { EmailIcon } from "@/assets/icon/icons";
import InputGroup from "@/components/custom-elements/InputGroup";
import { Logo } from "@/components/shared/logo";
import { CustomButton } from "@/components/custom-elements/button";
import { routes } from "@/constants/routes";
import { useSendForgotPasswordOtp } from "@/hooks/queries";
import { useAuthStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutateAsync: sendForgotPasswordOtp, isPending } =
    useSendForgotPasswordOtp();
  const { setEmail: setEmailInStore } = useAuthStore();

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const res = await sendForgotPasswordOtp({ email });
    if (res.data.status === "true") {
      setEmailInStore(email);
      router.push(routes.auth.verifyOtp);
    } 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg shadow-lg md:flex-row">
        {/* Form Section */}
        <div className="flex w-full flex-col justify-center bg-white p-8 md:w-1/2 md:p-12">
          {/* Centered Logo */}
          <div>
            <Logo />
          </div>
          <InputGroup
            type="email"
            className="[&_input]:py-[15px]"
            name="email"
            label="Email"
            placeholder="Email"
            // defaultValue="12345"
            // iconPosition="left"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<EmailIcon />}
            height="sm"
          />
          <div className="my-6">
            <CustomButton
              label="Send"
              loading={isPending}
              onClick={() => handleSubmit()}
              className="w-full py-5 text-lg font-medium text-white transition-all duration-300 hover:shadow-lg"
            />
          </div>

          <p className="text-center font-semibold text-purple-600 dark:text-white dark:hover:text-primary">
            <span className="cursor-pointer" onClick={() => router.push(routes.auth.signIn)}> Back To Login</span>
          </p>
        </div>

        {/* Welcome Section */}
        <div className="hidden w-full flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-teal-400 p-8 text-center text-white md:flex md:w-1/2 md:p-12">
          <h1 className="mb-4 text-2xl font-bold md:text-3xl">
            Forgot Your Password
          </h1>
          <p className="opacity-90 md:px-6">
            Please enter the email address you'd like your password reset
            information send to
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
