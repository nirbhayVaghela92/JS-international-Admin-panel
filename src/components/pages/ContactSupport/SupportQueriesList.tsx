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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import { useChangeUserStatus, useDeleteUser } from "@/hooks/queries";
import { FiltersTypes } from "@/utils/types";
import dayjs from "dayjs";
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import { paginationDropdownOptions } from "@/utils/data/dropdowns";
import TablePagination from "@/components/shared/CustomPagination/TablePagination";
import { DeleteDialog } from "@/components/shared/Dialog/DeleteDialog/DeleteDialog";
import { useGetDropdowns } from "@/hooks/useGetDropdowns";
import { CustomButton } from "@/components/custom-elements/button";
import { routes } from "@/constants/routes";
import StatusModal from "@/components/shared/Dialog/StatusChangeDialog";
import { Eye, View, X } from "lucide-react";
import InputGroup from "@/components/custom-elements/InputGroup";
import { Loader } from "@/components/custom-elements/Loader";
import { SortIcon } from "@/assets/icon";
import UserActionDropdown from "@/components/shared/User/UserActionDropdown";
import { TableActionButton } from "@/components/custom-elements/TableActionButton";

interface QueryType {
  id: number;
  name: string;
  email: string;
  phoneNo: string;
  query: string;
  status: "Active" | "Inactive" | "Pending";
  createdAt: string;
}

const columns = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Phone No", key: "phoneNo" },
  { label: "Query Preview", key: "query" },
  { label: "Status", key: "status", className: "text-center" },
  { label: "Created At", key: "createdAt" },
];

const dummyQueries: QueryType[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNo: "+1 (555) 123-4567",
    query:
      "I'm having trouble accessing my account. I've tried resetting my password multiple times but I'm not receiving the reset email. Can you help me resolve this issue?",
    status: "Active",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phoneNo: "+1 (555) 234-5678",
    query:
      "When will the new features be available? I'm particularly interested in the bulk upload functionality that was mentioned in the last update.",
    status: "Active",
    createdAt: "2024-02-20T14:45:00Z",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phoneNo: "+1 (555) 345-6789",
    query:
      "I was charged twice for my subscription this month. Please refund one of the charges.",
    status: "Inactive",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phoneNo: "+1 (555) 456-7890",
    query:
      "How do I export my data? I need all my records from the past year in CSV format for my annual report.",
    status: "Active",
    createdAt: "2024-04-05T16:20:00Z",
  },
  {
    id: 5,
    name: "David Kim",
    email: "david.kim@example.com",
    phoneNo: "+1 (555) 567-8901",
    query:
      "The mobile app keeps crashing when I try to upload images. This has been happening for the past week.",
    status: "Pending",
    createdAt: "2024-05-12T11:30:00Z",
  },
];

const mockQueryResponse = {
  data: dummyQueries,
  pagination: {
    page: 1,
    limit: 15,
    total: 5,
    total_pages: 1,
  },
};

export default function SupportQueriesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams?.get("page")) || 1;
  const [queryId, setQueryId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<QueryType | null>(null);
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

  const isLoading = false;
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

  const handleSort = (key: keyof QueryType) => {
    setFilters((prev) => ({
      ...prev,
      sort_by: key === "createdAt" ? "created_at" : key,
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
    setQueryId(null);
    setIsDeleteOpen(false);
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: mockQueryResponse?.pagination.page ?? prev.page,
      limit: mockQueryResponse?.pagination.limit ?? prev.limit,
      total_pages:
        mockQueryResponse?.pagination.total_pages ?? prev.total_pages,
      total_items: mockQueryResponse?.pagination?.total ?? prev.total_items,
    }));
  }, [mockQueryResponse, isLoading]);

  useEffect(() => {
    if (filters.page !== pageFromUrl) {
      router.push(routes.users.list(filters.page));
    }
  }, [filters.page]);

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
              placeholder="Search queries..."
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
                  {key !== "phoneNo" && key !== "status" && key !== "query" && (
                    <SortIcon
                      className="ml-1 inline h-4 w-4"
                      onClick={() => handleSort(key as keyof QueryType)}
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
                <TableCell colSpan={7} className="text-center">
                  <Loader />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {mockQueryResponse?.data?.length > 0 ? (
                mockQueryResponse?.data?.map((query: QueryType) => (
                  <TableRow key={query?.id}>
                    <TableCell>{query?.name}</TableCell>
                    <TableCell>{query?.email}</TableCell>
                    <TableCell>{query?.phoneNo}</TableCell>
                    <TableCell className="max-w-xs">
                      {truncateText(query?.query)}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={query?.status === "Active"}
                        onCheckedChange={() => {
                          setSelectedQuery(query);
                          setStatusModalOpen(true);
                        }}
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {dayjs(query?.createdAt).format("DD MMM, YYYY")}
                    </TableCell>
                    <TableCell>
                      <TableActionButton
                        Icon={Eye}
                        color="text-indigo-600"
                        label="View Query"
                        onClick={() => {
                          setSelectedQuery(query);
                          setIsViewDialogOpen(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    rowSpan={9}
                    className="h-[55vh] text-center"
                  >
                    No Queries Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>

        {/* Pagination */}
        {mockQueryResponse?.data.length > 0 && (
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

      {/* View Query Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Query Details</DialogTitle>
            <DialogDescription>
              Full details of the support query
            </DialogDescription>
          </DialogHeader>
          {selectedQuery && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Name</h4>
                  <p className="text-sm text-gray-600">{selectedQuery.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">Email</h4>
                  <p className="text-sm text-gray-600">{selectedQuery.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedQuery.phoneNo}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">
                    Status
                  </h4>
                  <p className="text-sm text-gray-600">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        selectedQuery.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : selectedQuery.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedQuery.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700">
                    Created At
                  </h4>
                  <p className="text-sm text-gray-600">
                    {dayjs(selectedQuery.createdAt).format(
                      "DD MMM, YYYY hh:mm A",
                    )}
                  </p>
                </div>
                {/* <div>
                  <h4 className="text-sm font-semibold text-gray-700">
                    Query ID
                  </h4>
                  <p className="text-sm text-gray-600">#{selectedQuery.id}</p>
                </div> */}
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-gray-700">
                  Full Query
                </h4>
                <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {selectedQuery.query}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <DeleteDialog
        message="Are you sure you want to delete this query?"
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => handleDelete(queryId as number)}
        isLoading={isDeleteingUser}
      />

      {/* Status Change Modal */}
      {statusModalOpen && selectedQuery && (
        <StatusModal
          dialogTitle="Change Query Status"
          isOpen={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          onConfirm={() => {
            if (selectedQuery?.id) {
              handleStatusChange(
                selectedQuery?.id,
                selectedQuery?.status === "Active" ? true : false,
              );
              setStatusModalOpen(false);
              setSelectedQuery(null);
            }
          }}
          currentStatus={selectedQuery?.status === "Active" ? "A" : "I"}
          itemTitle={`query from ${selectedQuery?.name}`}
          disabled={isChangingUserStatus}
        />
      )}
    </>
  );
}
