/* eslint-disable @typescript-eslint/no-explicit-any */

export const routes = {
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
    verifyOtp: "/verify-otp",
    resetPassword: "/reset-password",
  },
  users: {
    list: (page: number = 1) => `/users?page=${page}`,
    userPosts: (userId: number) => `/users/userposts/${userId}`,
    view: (id: number) => `/users/${id}`,
  },
  products: {
    list: (page: number = 1) => `/products?page=${page}`,
    view: (id: number) => `/products/${id}`,
  },
  dashboard: "/dashboard",
  supportQueries: {
    list: "/support-queries",
    // view: (id: number) => `/support-queries/${id}`,
  },
  settings: {
    editProfile: "/settings/account-settings",
    changePassword: "/settings/change-password",
  },
} as const;

export const publicRoutes: string[] = [
  routes.auth.signIn,
  routes.auth.forgotPassword,
  routes.auth.verifyOtp,
  routes.auth.resetPassword,
  // TODO: remove it
  //   routes.dashboard,
  // routes.challenges.list,
  // routes.settings.changePassword,
  // routes.settings.editProfile,
  // "/users",
  // "/settings/categories",
  // "/posts",
];

export const protectedRoutes: string[] = [
  routes.dashboard,
  routes.settings.changePassword,
  routes.settings.editProfile,
  "/users",
  "/settings/categories",
  "/posts",
];
