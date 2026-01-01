"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icon";
import InputGroup from "@/components/custom-elements/InputGroup";
import { Logo } from "@/components/shared/logo";
import { CustomButton } from "@/components/custom-elements/button";
import { routes } from "@/constants/routes";
import { useResetPassword } from "@/hooks/queries";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/utils/schemas";
import { useAuthStore } from "@/utils/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const ResetPassword = () => {
  const router = useRouter();
  const { token, email, clearStore, setToken, setEmail } = useAuthStore();
  const { mutateAsync: resetPassword, isPending: isLoading } =
    useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      email: email,
      confirm_password: "",
      new_password: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (values: ResetPasswordSchemaType) => {
    const { data } = await resetPassword({
      email,
      confirm_password: values?.confirm_password,
      new_password: values?.new_password,
    });

    if (!data?.status || data?.status === "false") {
      return;
    }

    clearStore();
    Cookies.remove("reset-password-token");
    router.replace(routes.auth.signIn);
  };

  useEffect(() => {
    if (!token || !email) {
      router.replace(routes.auth.signIn);
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg shadow-lg md:flex-row">
        {/* Form Section */}
        <div className="flex w-full flex-col justify-center bg-white p-8 md:w-1/2 md:p-12">
          {/* Centered Logo */}
          <div>
            <Logo />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputGroup
              type="email"
              disabled={true}
              label="Email"
              value={email}
              className="mb-4 [&_input]:py-[15px]"
              icon={<EmailIcon />}
            />
            <InputGroup
              type="password"
              label="New Password"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter New password"
              {...register("new_password")}
              error={!!errors.new_password}
              errorMessage={errors.new_password?.message}
              icon={<PasswordIcon />}
            />
            <InputGroup
              type="password"
              label="Confirm Password"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Confirm New password"
              error={!!errors.confirm_password}
              errorMessage={errors.confirm_password?.message}
              icon={<PasswordIcon />}
              {...register("confirm_password")}
            />

            <div className="my-6">
              <CustomButton
                loading={isLoading}
                label="Submit"
                type="submit"
                className="w-full py-5 text-lg font-medium text-white transition-all duration-300 hover:shadow-lg"
              />
            </div>

            <p
              className="text-center font-semibold text-purple-600 dark:text-white dark:hover:text-primary"
              onClick={() => router.push(routes.auth.signIn)}
            >
              <span className="cursor-pointer"> Back To Login</span>
            </p>
          </form>
        </div>

        {/* Welcome Section */}
        <div className="hidden w-full flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-teal-400 p-8 text-center text-white md:flex md:w-1/2 md:p-12">
          <h1 className="mb-4 text-2xl font-bold md:text-3xl">
            Reset Your Password
          </h1>
          <p className="opacity-90 md:px-6">
            Secure your account with a strong new password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
