"use client"
import Breadcrumb from "@/components/custom-elements/Breadcrumb";
import { CustomButton } from "@/components/custom-elements/button";
import { useExportUsersDataCSV } from "@/hooks/queries";
import { Download } from "lucide-react";
import UsersList from "@/components/shared/Tables/users-table/UsersList";

const Users = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />
      <div>
        <UsersList />
      </div>
    </>
  );
};

export default Users;
