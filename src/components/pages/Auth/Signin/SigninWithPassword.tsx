"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icon";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema, SignInSchemaType } from "@/utils/schemas";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import {  useSignIn } from "@/hooks/queries";
import Cookies from "js-cookie";
import { LocalStorageSetItem } from "@/utils/helpers";
import InputGroup from "@/components/custom-elements/InputGroup";
import { CustomButton } from "@/components/custom-elements/button";

export default function SigninWithPassword() {
  const router = useRouter();
  const { mutateAsync: signIn, isPending } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (values: SignInSchemaType) => {
    const { data } = await signIn({
      email: values.email,
      password: values.password,
    });
    console.log(data, "data")
    if (!data?.success || data?.success === "false") {
      throw new Error(data?.message || "Login failed.");
    }

    Cookies.set("token", data.token);
    // const res = await getAdminDetails(data.data.admin.id);
    LocalStorageSetItem("adminDetails", data?.admin);

    router.replace(routes.dashboard);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        error={!!errors.email}
        errorMessage={errors.email?.message}
        icon={<EmailIcon />}
        {...register("email")}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        error={!!errors.password}
        errorMessage={errors.password?.message}
        icon={<PasswordIcon />}
        {...register("password")}
      />

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Link
          href={routes.auth.forgotPassword}
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <CustomButton
          loading={isPending}
          label="Sign In"
          type="submit"
          className="w-full py-5 text-lg font-medium text-white transition-all duration-300 hover:shadow-lg"
        />
      </div>
    </form>
  );
}
