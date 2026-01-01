"use client";
import {  PasswordIcon } from "@/assets/icon";
import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import InputGroup from "@/components/custom-elements/InputGroup";
import { CustomButton } from "@/components/custom-elements/button";
import { useChangePassword } from "@/hooks/queries";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { routes } from "@/constants/routes";

const ChangePassword = () => {
  const { mutateAsync: changePasssword, isPending: isLoading } =
    useChangePassword();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (values: ChangePasswordSchemaType) => {
    const { data } = await changePasssword({
      current_password: values.current_password,
      new_password: values.new_password,
      confirm_new_password: values.confirm_new_password,
    });

    if (!data?.status || data?.status === "false") {
      return;
    }
    
    // SessionStorageRemoveItem("userData");
    Cookies.remove("token");
    router.replace(routes.auth.signIn);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="max-w-lg">
        <Breadcrumb pageName="Change Password" />
        <div className="rounded-[10px] bg-white p-7 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex flex-col gap-3">
            <InputGroup
              type="password"
              label="Current Password"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter Current password"
              error={!!errors.current_password}
              errorMessage={errors.current_password?.message}
              icon={<PasswordIcon />}
              {...register("current_password")}
            />

            <InputGroup
              type="password"
              label="New Password"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter New password"
              error={!!errors.new_password}
              errorMessage={errors.new_password?.message}
              icon={<PasswordIcon />}
              {...register("new_password")}
            />
            <InputGroup
              type="password"
              label="Confirm Password"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Confirm New password"
              error={!!errors.confirm_new_password}
              errorMessage={errors.confirm_new_password?.message}
              icon={<PasswordIcon />}
              {...register("confirm_new_password")}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
              type="button"
            >
              Cancel
            </button>

            <CustomButton
              className="rounded-lg bg-gradient-to-r from-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
              type="submit"
              label="Save"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
