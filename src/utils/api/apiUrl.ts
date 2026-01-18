import { changeProductStatus, deleteProduct } from "@/services/products.service";

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
  getUsersList: "/admin/get-user-list",
  getUserFollowerList: "/admin/get-user-follower-list",
  getUserFollowingList: "/admin/get-user-following-list",
  getUsersDetails: "/admin/get-user-profile",
  getReportedUsersList: "/admin/get-reported-users",
  getAppDownloadLink: "/qr-download",
  exportUsersCSV: "/user/export-users",
  getUserBussinessList: "/admin/user/businesses",

  // Products
  productsList: "/admin/products-listing",
  productDetails: (slug:string) => `/admin/products/${slug}`,
  createProduct: "/admin/products",
  editProduct: (id: number) => `/admin/products/${id}`,
  changeProductStatus: (id:number) => `/admin/products/${id}/change-status`,
  deleteProduct: (id:number) => `/admin/products/${id}`,
};
