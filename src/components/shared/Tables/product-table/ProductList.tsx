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
  useChangeProductStatus,
  useDeleteProduct,
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
import StatusModal from "@/components/shared/Dialog/StatusChangeDialog";
import { X } from "lucide-react";
import InputGroup from "@/components/custom-elements/InputGroup";
import { Loader } from "@/components/custom-elements/Loader";
import { SortIcon } from "@/assets/icon";
import { AddEditProductDialog } from "../../Dialog/CreateEditDialogs/AddEditProductDialog";
import UserActionDropdown from "../../User/UserActionDropdown";

interface ProductType {
  name: string;
  category: string;
  price: number;
  quantity: number;
  productId: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

const columns = [
  { label: "Product ID", key: "productId" },
  { label: "Product Name", key: "name" },
  { label: "Category", key: "category" },
  { label: "Price", key: "price" },
  { label: "Quantity", key: "quantity" },
  { label: "Status", key: "status", className: "text-center" },
  { label: "Created At", key: "createdAt" },
];

const dummyProducts = [
  {
    id: 1,
    productId: "PRD-001",
    name: "Classic Leather Watch",
    category: "Men's Watch",
    price: 299.99,
    quantity: 45,
    status: "Active",
    createdAt: "2024-01-15T10:30:00Z",
    cover_image: null,
    images: [],
    color_options: ["Black", "Brown"],
  },
  {
    id: 2,
    productId: "PRD-002",
    name: "Elegant Gold Watch",
    category: "Women's Watch",
    price: 459.99,
    quantity: 23,
    status: "Active",
    createdAt: "2024-02-20T14:45:00Z",
    cover_image: null,
    images: [],
    color_options: ["Gold", "Rose Gold"],
  },
  {
    id: 3,
    productId: "PRD-003",
    name: "Designer Leather Purse",
    category: "Purses",
    price: 189.99,
    quantity: 67,
    status: "Active",
    createdAt: "2024-03-10T09:15:00Z",
    cover_image: null,
    images: [],
    color_options: ["Black", "Red", "Tan"],
  },
  {
    id: 4,
    productId: "PRD-004",
    name: "Diamond Necklace",
    category: "Jewellery",
    price: 1299.99,
    quantity: 12,
    status: "Inactive",
    createdAt: "2024-04-05T16:20:00Z",
    cover_image: null,
    images: [],
    color_options: ["Silver", "Gold"],
  },
  {
    id: 5,
    productId: "PRD-005",
    name: "Sport Chronograph Watch",
    category: "Men's Watch",
    price: 399.99,
    quantity: 0,
    status: "Active",
    createdAt: "2024-05-12T11:30:00Z",
    cover_image: null,
    images: [],
    color_options: ["Black", "Blue"],
  },
  {
    id: 6,
    productId: "PRD-006",
    name: "Pearl Bracelet",
    category: "Jewellery",
    price: 249.99,
    quantity: 34,
    status: "Active",
    createdAt: "2024-06-18T13:45:00Z",
    cover_image: null,
    images: [],
    color_options: ["White", "Pink"],
  },
  {
    id: 7,
    productId: "PRD-007",
    name: "Minimalist Silver Watch",
    category: "Women's Watch",
    price: 179.99,
    quantity: 56,
    status: "Active",
    createdAt: "2024-07-22T08:00:00Z",
    cover_image: null,
    images: [],
    color_options: ["Silver", "White"],
  },
  {
    id: 8,
    productId: "PRD-008",
    name: "Crossbody Handbag",
    category: "Purses",
    price: 129.99,
    quantity: 89,
    status: "Active",
    createdAt: "2024-08-30T15:10:00Z",
    cover_image: null,
    images: [],
    color_options: ["Black", "Brown", "Navy"],
  },
];

const mockProductResponse = {
  data: dummyProducts,
  pagination: {
    page: 1,
    limit: 15,
    total: 8,
    total_pages: 1,
  },
};

export default function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams?.get("page")) || 1;
  const [productId, setProductId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<any>(null);
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
    categoryId: undefined,
  });

  const { statusDropdown, categoryDropdown } = useGetDropdowns({
    isStatusDropdown: true,
    isCategoryDropdown: true,
  });

  // const { data, isLoading } = useGetProductsList(filters);
  const isLoading = false;
  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
    useDeleteProduct();
  const {
    mutateAsync: changeProductStatus,
    isPending: isChangingProductStatus,
  } = useChangeProductStatus();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: e.target.value }));
    }, 500);
  };

  const handleSort = (key: keyof ProductType) => {
    setFilters((prev) => ({
      ...prev,
      sort_by: key === "createdAt" ? "created_at" : key,
      sort_order: prev.sort_order === "asc" ? "desc" : "asc",
    }));
  };

  const handleStatusChange = async (id: number, checked: boolean) => {
    await changeProductStatus({
      id: id,
      status: checked ? "I" : "A",
    });
  };

  const handleDelete = async (id: number) => {
    if (!id || isDeletingProduct) return;
    await deleteProduct(id);
    setProductId(null);
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: mockProductResponse?.pagination.page ?? prev.page,
      limit: mockProductResponse?.pagination.limit ?? prev.limit,
      total_pages:
        mockProductResponse?.pagination.total_pages ?? prev.total_pages,
      total_items: mockProductResponse?.pagination?.total ?? prev.total_items,
    }));
  }, [mockProductResponse, isLoading]);

  useEffect(() => {
    if (filters.page !== pageFromUrl) {
      router.push(routes.products.list(filters.page));
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
              placeholder="Search products..."
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
                  status: option as "A" | "I",
                }));
              }}
            />
            <CustomDropdown
              placeholder="Filter by Category"
              width="w-70"
              options={categoryDropdown!}
              value={filters.categoryId}
              onChange={(option) => {
                setFilters((prev) => ({
                  ...prev,
                  category: option as string,
                }));
              }}
            />

            {(filters.status || filters.categoryId) && (
              <CustomButton
                className="p-0 pl-2"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    search: "",
                    status: undefined,
                    categoryId: undefined,
                  }));
                  setSearchTerm("");
                }}
                type="button"
                label="Clear Filters"
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
                  {key !== "status" && key !== "productId" && (
                    <SortIcon
                      className="ml-1 inline h-4 w-4"
                      onClick={() => handleSort(key as keyof ProductType)}
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
                <TableCell colSpan={8} className="text-center">
                  <Loader />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {mockProductResponse?.data?.length > 0 ? (
                mockProductResponse?.data?.map((product: any) => (
                  <TableRow key={product?.id}>
                    <TableCell className="font-medium">
                      {product?.productId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {product?.cover_image && (
                          <img
                            src={product.cover_image}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                        )}
                        <span>{product?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product?.category}</TableCell>
                    <TableCell>${product?.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          product?.quantity === 0
                            ? "text-red-600"
                            : product?.quantity < 20
                              ? "text-orange-600"
                              : "text-green-600"
                        }`}
                      >
                        {product?.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={product?.status === "Active"}
                        onCheckedChange={() => {
                          setProductDetails(product);
                          setStatusModalOpen(true);
                        }}
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {dayjs(product?.createdAt).format("DD MMM, YYYY")}
                    </TableCell>
                    <TableCell>
                      <UserActionDropdown
                        onView={() =>
                          router.push(routes.products.view(product.id))
                        }
                        onEdit={() => {
                          setProductDetails(product);
                          setIsDialogOpen(true);
                        }}
                        onDelete={() => {
                          setIsDeleteOpen(true);
                          setProductId(product.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    rowSpan={9}
                    className="h-[55vh] text-center"
                  >
                    No Products Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>

        {/* Pagination */}
        {mockProductResponse?.data.length > 0 && (
          <TablePagination
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
          />
        )}
      </div>

      {/* Dialogs */}
      {isDialogOpen && (
        <AddEditProductDialog
          productDetails={productDetails}
          isOpen={true}
          mode="edit"
          onClose={() => {
            setIsDialogOpen(false);
            setProductDetails(null);
          }}
        />
      )}

      <DeleteDialog
        message="Are you sure you want to delete this product?"
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => handleDelete(productId as number)}
        isLoading={isDeletingProduct}
      />

      {statusModalOpen && productDetails && (
        <StatusModal
          dialogTitle="Change Product Status"
          isOpen={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          onConfirm={() => {
            if (productDetails?.id) {
              handleStatusChange(
                productDetails?.id,
                productDetails?.status === "Active" ? true : false,
              );
              setStatusModalOpen(false);
              setProductDetails(null);
            }
          }}
          currentStatus={productDetails?.status === "Active" ? "A" : "I"}
          itemTitle={productDetails?.name || "product"}
          disabled={isChangingProductStatus}
        />
      )}
    </>
  );
}
