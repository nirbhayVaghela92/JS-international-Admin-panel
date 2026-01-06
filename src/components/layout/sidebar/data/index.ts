import { routes } from "@/constants/routes";
import * as Icons from "@/assets/icon";

export const NAV_DATA = [
  {
    label: "",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: routes.dashboard,
        items: [],
      },
      {
        title: "User",
        url: routes.users.list(),
        icon: Icons.User,
        items: [],
      },
      {
        title: "Products",
        url: routes.products.list(),
        icon: Icons.Products,
        items: [],
      },
      {
        title: "Support Quries",
        url: routes.supportQueries.list,
        icon: Icons.supportIcon ,
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.SettingsIcon,
        url: "/settings",
        items: [
          {
            title: "Account Settings",
            url: routes.settings.editProfile,
          },
          {
            title: "Change Password",
            url: routes.settings.changePassword,
          },
        ],
      },
    ],
  },
];
