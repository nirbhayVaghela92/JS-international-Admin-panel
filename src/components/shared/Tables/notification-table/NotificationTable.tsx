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
import { PlusIcon, X } from "lucide-react";
import { CustomButton } from "@/components/custom-elements/button";
import dayjs from "dayjs";
import { TableActions } from "../TableActions";
import { useRouter } from "next/navigation";
import { DeleteDialog } from "@/components/shared/Dialog/DeleteDialog/DeleteDialog";
import { NotificationDialog } from "@/components/shared/Dialog/CreateEditDialogs/AddNotificationDialog";
import {
  useDeleteNotification,
  useGetNotificationList,
} from "@/hooks/queries";
import { FiltersTypes } from "@/utils/types";
import TablePagination from "@/components/shared/CustomPagination/TablePagination";

import { formatDate } from "@/utils/helpers/commonHelpers";
import InputGroup from "@/components/custom-elements/InputGroup";
import { Loader } from "@/components/custom-elements/Loader";
import UserTypeBadge from "@/components/custom-elements/UserTypeBadge";
import { cn } from "@/lib/utils";

const columns = [
  { label: "Title", key: "title" },
  { label: "Message", key: "message" },
  // { label: "Sent To", key: "userType" },
  { label: "Created At", key: "createdAt", className: "" },
];

export function NotificationTable() {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notificationId, setNotificationId] = useState<number | null>(null);
  const [notification, setNotification] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FiltersTypes>({
    page: 1,
    limit: 15,
    search: "",
    total_pages: 0,
    total_items: 0,
  });

  const { data, isLoading } = useGetNotificationList(filters);
  const {
    mutateAsync: deleteNotification,
    isPending: isDeleteingNotification,
  } = useDeleteNotification();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);

    const performSearch = () => {
      setFilters((prev) => ({ ...prev, search: e.target.value }));
    };

    timeoutRef.current = setTimeout(performSearch, 500);
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    if (isDeleteingNotification) return;
    await deleteNotification(id);
    setNotificationId(null);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="rounded-lg bg-white p-8 pt-0 shadow-lg">
        <div className="flex items-center justify-between flex-col sm:flex-row">
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
          </div>
          <CustomButton
            onClick={() => {
              setIsDialogOpen(true);
              setNotification(null);
            }}
            className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-[7px] font-bold text-gray-2 hover:bg-opacity-90 xl:px-5"
            label="Send Notification"
            icon={<PlusIcon />}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(({ label, key, className }) => (
                <TableHead key={key} className={cn("cursor-pointer", className)}>
                  {label}
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.notifications?.length > 0 ? (
              data?.notifications?.map((notification: any) => (
                <TableRow key={notification?.id}>
                  <TableCell>{notification?.title}</TableCell>
                  <TableCell title={notification?.message}>
                    {notification?.message.length > 50
                      ? notification?.message.slice(0, 50) + "..."
                      : notification?.message}
                  </TableCell>
                  {/* <TableCell><UserTypeBadge type="user" className="w-fit"/></TableCell> */}
                  <TableCell>{formatDate(notification?.createdAt)}</TableCell>
                  <TableCell>
                    <TableActions
                      onView={() => {
                        setIsDialogOpen(true);
                        setNotification(notification);
                      }}
                      // onEdit={() => {
                      //   // Static design, no edit functionality
                      //   console.log("Edit notification", notification.id);
                      // }}
                      onDelete={() => {
                        setIsDeleteOpen(true);
                        setNotificationId(notification.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No Notifications Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {data?.notifications.length > 0 && <TablePagination
          currentPage={filters.page}
          totalPages={filters.total_pages}
          itemsPerPage={filters.limit}
          totalItems={filters.total_items || 0}
          onPageChange={(page: number) => {
            setFilters((prev) => ({
              ...prev,
              page: page,
            }));
          }}
        />}
      </div>

      <DeleteDialog
        message="Are you sure you want to delete this Notification?"
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => handleDelete(notificationId as number)}
        isLoading={isDeleteingNotification}
      />
      {isDialogOpen && (
        <NotificationDialog
          isOpen={isDialogOpen}
          mode={notification ? "view" : "create"}
          notification={notification}
          onClose={() => setIsDialogOpen(false)}
          title={`${notification ? "Notification" : "Send Notification"}`}
        />
      )}
    </>
  );
}
