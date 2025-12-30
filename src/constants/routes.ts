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

  userposts: {
    list: (page: number = 1) => `/usersposts?page=${page}`,
    view: ({
      id,
      page = 1,
      groupPost = false,
      groupPage,
      groupId,
      isContestPost,
      isAnnocementPost = false,
      isRewardPost = false,
      contestId,
    }: {
      id: number;
      page?: number;
      groupPost?: boolean;
      groupPage?: number;
      groupId?: number;
      isContestPost?: boolean;
      isAnnocementPost?: boolean;
      isRewardPost?: boolean;
      contestId?: number;
    }) => {
      const params = new URLSearchParams({
        page: String(page),
        groupPost: String(groupPost),
        isAnnocementPost: String(isAnnocementPost),
      });
      if (groupPage !== undefined)
        params.append("groupPage", String(groupPage));
      if (groupId !== undefined) params.append("groupId", String(groupId));
      if (isContestPost !== undefined)
        params.append("isContestPost", String(isContestPost));
      if (isRewardPost !== undefined)
        params.append("isRewardPost", String(isRewardPost));
      if (contestId !== undefined)
        params.append("contestId", String(contestId));
      return `/usersposts/${id}?${params.toString()}`;
    },
    comments: (postId: number, isContestPost: boolean = false) =>
      `/usersposts/${postId}/userscomments?isContestPost=${isContestPost}`,
  },
  // notification: {
  //   list: "/notification",
  //   // view: (id: number) => `/adventure/${id}`,
  // },

  // tags: "/tags",
  dashboard: "/dashboard",
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
