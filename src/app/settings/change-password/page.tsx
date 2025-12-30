import ChangePassword from "@/components/pages/Settings/ChangePassword"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
};

function ChangePasswordPage() {
  return (
    <ChangePassword />
  )
}

export default ChangePasswordPage;