"use client"
import Breadcrumb from "@/components/custom-elements/Breadcrumb";
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
