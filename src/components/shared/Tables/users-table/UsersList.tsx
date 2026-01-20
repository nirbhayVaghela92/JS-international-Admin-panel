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


const dummyUsers = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phoneNo: "+1 (555) 123-4567",
    status: "Active",
    createdAt: "2024-01-15T10:30:00Z",
    age: "32",
    gender: "Male",
    region: "NA",
    profile: { avatar: null },
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.johnson@example.com",
    phoneNo: "+1 (555) 234-5678",
    status: "Active",
    createdAt: "2024-02-20T14:45:00Z",
    age: "28",
    gender: "Female",
    region: "NA",
    profile: { avatar: null },
  },
  {
    id: 3,
    first_name: "Michael",
    last_name: "Chen",
    email: "michael.chen@example.com",
    phoneNo: "+1 (555) 345-6789",
    status: "Inactive",
    createdAt: "2024-03-10T09:15:00Z",
    age: "35",
    gender: "Male",
    region: "SA",
    profile: { avatar: null },
  },
  {
    id: 4,
    first_name: "Emily",
    last_name: "Rodriguez",
    email: "emily.rodriguez@example.com",
    phoneNo: "+1 (555) 456-7890",
    status: "Active",
    createdAt: "2024-04-05T16:20:00Z",
    age: "29",
    gender: "Female",
    region: "SA",
    profile: { avatar: null },
  },
  {
    id: 5,
    first_name: "David",
    last_name: "Kim",
    email: "david.kim@example.com",
    phoneNo: "+1 (555) 567-8901",
    status: "Active",
    createdAt: "2024-05-12T11:30:00Z",
    age: "41",
    gender: "Male",
    region: "NA",
    profile: { avatar: null },
  },
  {
    id: 6,
    first_name: "Jessica",
    last_name: "Brown",
    email: "jessica.brown@example.com",
    phoneNo: "+1 (555) 678-9012",
    status: "Inactive",
    createdAt: "2024-06-18T13:45:00Z",
    age: "26",
    gender: "Female",
    region: "Sd",
    profile: { avatar: null },
  },
  {
    id: 7,
    first_name: "Robert",
    last_name: "Martinez",
    email: "robert.martinez@example.com",
    phoneNo: "+1 (555) 789-0123",
    status: "Active",
    createdAt: "2024-07-22T08:00:00Z",
    age: "38",
    gender: "Male",
    region: "SA",
    profile: { avatar: null },
  },
  {
    id: 8,
    first_name: "Amanda",
    last_name: "Taylor",
    email: "amanda.taylor@example.com",
    phoneNo: "+1 (555) 890-1234",
    status: "Active",
    createdAt: "2024-08-30T15:10:00Z",
    age: "33",
    gender: "Female",
    region: "NA",
    profile: { avatar: null },
  },
  {
    id: 9,
    first_name: "James",
    last_name: "Anderson",
    email: "james.anderson@example.com",
    phoneNo: "+1 (555) 901-2345",
    status: "Pending",
    createdAt: "2024-09-14T10:25:00Z",
    age: "45",
    gender: "Male",
    region: "Ss",
    profile: { avatar: null },
  },
  {
    id: 10,
    first_name: "Lisa",
    last_name: "Wilson",
    email: "lisa.wilson@example.com",
    phoneNo: "+1 (555) 012-3456",
    status: "Active",
    createdAt: "2024-10-08T12:40:00Z",
    age: "31",
    gender: "Female",
    region: "NA",
    profile: { avatar: null },
  },
  {
    id: 11,
    first_name: "Christopher",
    last_name: "Lee",
    email: "chris.lee@example.com",
    phoneNo: "+1 (555) 123-7890",
    status: "Inactive",
    createdAt: "2024-11-02T09:30:00Z",
    age: "27",
    gender: "Male",
    region: "Sd",
    profile: { avatar: null },
  },
  {
    id: 12,
    first_name: "Michelle",
    last_name: "Garcia",
    email: "michelle.garcia@example.com",
    phoneNo: "+1 (555) 234-8901",
    status: "Active",
    createdAt: "2024-12-15T14:15:00Z",
    age: "36",
    gender: "Female",
    region: "SA",
    profile: { avatar: null },
  },
];

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
  console.log(data, "data")
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
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
              className="w-full py-2 pl-4"
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
                <TableCell colSpan={9} className="text-center">
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
                        {(`${user?.first_name ?? ""} ${user?.last_name ?? ""}`).trim() || "-"}
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
                userDetails?.status === "active" ? true : false,
              );
              setStatusModalOpen(false);
              setUserDetails(null);
            }
          }}
          currentStatus={userDetails?.status === "Active" ? "A" : "I"}
          itemTitle={userDetails?.name || "user"}
          disabled={isChangingUserStatus}
        />
      )}
    </>
  );
}
