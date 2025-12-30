import { Logo } from "@/components/shared/logo";
import SigninWithPassword from "./SigninWithPassword";

export const SignIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg shadow-lg md:flex-row">
        {/* Form Section */}
        <div className="flex w-full flex-col justify-center bg-white p-8 md:w-1/2 md:p-12">
          {/* Centered Logo */}
          <div className="mb-5">
            <Logo  className="h-12 "/>
          </div>
          <SigninWithPassword />
        </div>

        {/* Welcome Section */}
        <div className="hidden w-full flex-col items-center justify-center bg-primary p-8 text-center text-white md:flex md:w-1/2 md:p-12">
          <h1 className="mb-4 text-2xl font-bold md:text-3xl">Welcome Back!</h1>
          <p className="opacity-90 md:px-6">
            Sign in to access your account and manage your content easily.
          </p>
        </div>
      </div>
    </div>
  );
};

