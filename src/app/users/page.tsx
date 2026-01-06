import Users from "@/components/pages/Users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

const UsersPages = () => {
  return <Users />;
};

export default UsersPages;
