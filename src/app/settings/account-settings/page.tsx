import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import type { Metadata } from "next";
import { AccountSettings } from "@/components/pages/Settings/AccountSettings";

export const metadata: Metadata = {
  title: "Account Settings",
};

export default function SettingsPage() {
  return (
    <div className="max-w-lg">
      <Breadcrumb pageName="Account Settings" />
      <div className="mt-5">
        <AccountSettings />
      </div>
    </div>
  );
}
