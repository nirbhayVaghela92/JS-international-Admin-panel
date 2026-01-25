import { changeProductStatus, deleteProduct } from "@/services/products.service";
import { de } from "date-fns/locale";

export const API = {
  signin: "/admin/login",
  sendForgotPasswordOtp: "/admin/forgot-password/send-otp",
  verifyForgotPasswordOtp: "/admin/forgot-password/verify-otp",
  resetPassword: "/admin/forgot-password/update-password",
  changePassword: "/admin/account-settings/change-password",
  getDashbaoardData: "/admin/dashboard",
  editAdminProfile: "/admin/update",
  getCountryList: "/common/country-list",
  getStateList: "/common/state-list",
  getCityList: "/common/city-list",
  adminDetails: "/admin",

  getConfigs: "/common/config",
  // User APIs
  getUsersList: "/admin/users",
  changeUserStatus: (id: number) => `/admin/users/${id}/status`,
  deleteUser: (id: number) => `/admin/users/${id}`,
  editUser: (id: number) => `/admin/users/${id}`,
  getUsersDetails: "/admin/get-user-profile",

  // Products
  productsList: "/admin/products-listing",
  productDetails: (slug:string) => `/admin/products/${slug}`,
  createProduct: "/admin/products",
  editProduct: (id: number) => `/admin/products/${id}`,
  changeProductStatus: (id:number) => `/admin/products/${id}/change-status`,
  deleteProduct: (id:number) => `/admin/products/${id}`,

  // support queries
  getSupportQueriesList: "/admin/support-queries",
};
