"use client";

import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "../../../ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useChangeUserStatus,
  useDeleteUser,
  useGetUsersList,
} from "@/hooks/queries";
import { FiltersTypes } from "@/utils/types";
import dayjs from "dayjs";
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import { paginationDropdownOptions } from "@/utils/data/dropdowns";
import TablePagination from "@/components/shared/CustomPagination/TablePagination";
import { DeleteDialog } from "@/components/shared/Dialog/DeleteDialog/DeleteDialog";
import { useGetDropdowns } from "@/hooks/useGetDropdowns";
import { CustomButton } from "@/components/custom-elements/button";
import { routes } from "@/constants/routes";
import { EditUserDialog } from "@/components/shared/Dialog/CreateEditDialogs/EditUserDialog";
import StatusModal from "@/components/shared/Dialog/StatusChangeDialog";

import { X } from "lucide-react";

import InputGroup from "@/components/custom-elements/InputGroup";
import UserActionDropdown from "../../User/UserActionDropdown";
import { Loader } from "@/components/custom-elements/Loader";
import { SortIcon } from "@/assets/icon";
import { formatDate } from "@/utils/helpers/commonHelpers";

interface UserType {
  name: string;
  email: string;
  profile: any;
  location: string;
  status: "Active" | "Inactive" | "Pending";
  createdAt: string;
  age: string;
  number: string;
  gender: string;
}

const columns = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Phone No", key: "phoneNo" },
  { label: "Status", key: "status", className: "text-center" },
  { label: "Created At", key: "createdAt" },
];

export default function UsersList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams?.get("page")) || 1;
  const [userId, setUserId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FiltersTypes>({
    page: Number(searchParams?.get("page")) || 1,
    limit: 15,
    status: undefined,
    search: "",
    total_pages: 0,
    total_items: 0,
    sort_by: undefined,
    sort_order: "asc",
  });

  const { statusDropdown } = useGetDropdowns({
    isStatusDropdown: true,
  });

  const { data, isLoading } = useGetUsersList(filters);
  console.log(data, "data");
  const { mutateAsync: deleteUser, isPending: isDeleteingUser } =
    useDeleteUser();
  const { mutateAsync: changeUserStatus, isPending: isChangingUserStatus } =
    useChangeUserStatus();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: e.target.value }));
    }, 500);
  };

  const handleSort = (key: keyof UserType) => {
    setFilters((prev) => ({
      ...prev,
      // sort_by:
      //   key === "name" ? "full_name" : key === "createdAt" ? "created_at" : key,
      sort_by: key,
      sort_order: prev.sort_order === "asc" ? "desc" : "asc",
    }));
  };

  const handleStatusChange = async (id: number, checked: boolean) => {
    await changeUserStatus({
      id: id,
      status: checked ? 0 : 1,
    });
    setStatusModalOpen(false);
    setUserDetails(null);
  };

  const handleDelete = async (id: number) => {
    if (!id || isDeleteingUser) return;
    await deleteUser(id);
    setUserId(null);
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: data?.pagination.page ?? prev.page,
      limit: data?.pagination.limit ?? prev.limit,
      total_pages: data?.pagination.total_pages ?? prev.total_pages,
      total_items: data?.pagination?.total ?? prev.total_items,
    }));
  }, [data, isLoading]);

  // Update URL when page changes (but avoid infinite loops)
  useEffect(() => {
    if (filters.page !== pageFromUrl) {
      router.push(routes.users.list(filters.page));
    }
  }, [filters.page]);

  // Sync filters.page with URL params whenever searchParams change
  useEffect(() => {
    if (pageFromUrl !== filters.page) {
      setFilters((prev) => ({ ...prev, page: pageFromUrl }));
    }
  }, [pageFromUrl]);

  return (
    <>
      <div className="overflow-x-auto rounded-lg bg-white p-8 pt-0 shadow-lg">
        {/* Filters */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row mt-3">
          <div className="relative flex items-center gap-2 pt-2">
            <InputGroup
              name="search"
              icon={
                <X
                  className="h-5 w-5 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 shadow-sm transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters((prev) => ({ ...prev, search: "" }));
                  }}
                />
              }
              label=""
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full"
            />
            <CustomDropdown
              placeholder="Filter by Status"
              width="w-70"
              options={statusDropdown!}
              value={filters.status}
              onChange={(option) => {
                setFilters((prev) => ({
                  ...prev,
                  status: option as any,
                }));
              }}
            />

            {filters.status && (
              <CustomButton
                className="p-0 pl-2"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    search: "",
                    status: undefined,
                  }));
                  setSearchTerm("");
                }}
                type="button"
                label="Clear Filter"
                variant="clear"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-sm text-gray-600">
              Per Page:
            </span>
            <CustomDropdown
              width="w-18"
              options={paginationDropdownOptions}
              onChange={(value: number | string) => {
                setFilters((prev) => ({
                  ...prev,
                  limit:
                    typeof value === "number" ? value : parseInt(value, 10),
                }));
              }}
              value={filters.limit}
            />
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(({ label, key, className }) => (
                <TableHead
                  key={key}
                  className={`cursor-pointer ${className ?? ""}`}
                >
                  {label}
                  {/* Add sort icon except for non-sortable columns */}
                  {(key === "name" || key === "createdAt") && (
                    <SortIcon
                      className="ml-1 inline h-4 w-4"
                      onClick={() => handleSort(key as keyof UserType)}
                    />
                  )}
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={9} rowSpan={9} className="text-center">
                  <Loader />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {data?.users?.length > 0 ? (
                data?.users?.map((user: any) => (
                  <TableRow key={user?.id}>
                    <TableCell>
                      <div>
                        {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
                          "-"}
                      </div>
                    </TableCell>
                    <TableCell>{user?.email || "-"}</TableCell>
                    <TableCell>{user?.phone || "-"}</TableCell>
                    <TableCell>
                      <Switch
                        checked={user?.active}
                        onCheckedChange={() => {
                          setUserDetails(user);
                          setStatusModalOpen(true);
                        }}
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(user?.created_at) || "-"}
                    </TableCell>
                    <TableCell>
                      <UserActionDropdown
                        // onView={() => router.push(routes.users.view(user.id))}
                        onEdit={() => {
                          setUserDetails(user);
                          setIsDialogOpen(true);
                        }}
                        onDelete={() => {
                          setIsDeleteOpen(true);
                          setUserId(user.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    rowSpan={9}
                    className="h-[55vh] text-center"
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>

        {/* Pagination */}
        {data?.users?.length > 0 && (
          <TablePagination
            currentPage={filters.page!}
            totalPages={filters.total_pages!}
            itemsPerPage={filters.limit!}
            totalItems={filters.total_items || 0}
            onPageChange={(page: number) => {
              setFilters((prev) => ({
                ...prev,
                page: page,
              }));
            }}
          />
        )}
      </div>

      {/* Dialogs */}
      {isDialogOpen && userDetails && (
        <EditUserDialog
          userDetails={userDetails}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}

      <DeleteDialog
        message="Are you sure you want to delete this User?"
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => handleDelete(userId as number)}
        isLoading={isDeleteingUser}
      />

      {statusModalOpen && userDetails && (
        <StatusModal
          dialogTitle="Change User Status"
          isOpen={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          onConfirm={() => {
            if (userDetails?.id) {
              handleStatusChange(
                userDetails?.id,
                userDetails?.active === 1 ? true : false,
              );
            }
          }}
          currentStatus={userDetails?.active === 1 ? "A" : "I"}
          itemTitle={userDetails?.name || "user"}
          isLoading={isChangingUserStatus}
        />
      )}
    </>
  );
}
