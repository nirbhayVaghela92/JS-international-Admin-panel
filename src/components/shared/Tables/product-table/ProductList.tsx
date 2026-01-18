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
  useGetProductList,
} from "@/hooks/queries";
import { CategoryType, FiltersTypes } from "@/utils/types";
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
import { formatDate, formatPrice } from "@/utils/helpers/commonHelpers";

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
  { label: "Product Code", key: "productId" },
  { label: "Product Name", key: "name" },
  { label: "Category", key: "category" },
  { label: "Price", key: "price" },
  { label: "Quantity", key: "quantity" },
  { label: "Status", key: "status", className: "text-center" },
  { label: "Created At", key: "createdAt" },
];

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
    category: undefined,
  });

  const { statusDropdown, categoryDropdown } = useGetDropdowns({
    isStatusDropdown: true,
    isCategoryDropdown: true,
  });

  const { data, isLoading } = useGetProductList(filters);

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

  // const handleSort = (key: keyof ProductType) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     sort_by: key === "createdAt" ? "created_at" : key,
  //     sort_order: prev.sort_order === "asc" ? "desc" : "asc",
  //   }));
  // };

  const handleStatusChange = async (id: number, checked: boolean) => {
    await changeProductStatus({
      id: id,
      status: checked ? 0 : 1,
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
      page: data?.data?.pagination.page ?? prev.page,
      limit: data?.data?.pagination.limit ?? prev.limit,
      total_pages:
        data?.data?.pagination.total_pages ?? prev.total_pages,
      total_items: data?.data?.pagination?.total ?? prev.total_items,
    }));
  }, [ isLoading]);

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
                  status: option as any,
                }));
              }}
            />
            <CustomDropdown
              placeholder="Filter by Category"
              width="w-70"
              options={categoryDropdown!}
              value={filters.category}
              onChange={(option) => {
                setFilters((prev) => ({
                  ...prev,
                  category: option as CategoryType,
                }));
              }}
            />

            {(filters.status || filters.category) && (
              <CustomButton
                className="p-0 pl-2"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    search: "",
                    status: undefined,
                    category: undefined,
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
                  {/* {key !== "status" && key !== "productId" && (
                    <SortIcon
                      className="ml-1 inline h-4 w-4"
                      onClick={() => handleSort(key as keyof ProductType)}
                    />
                  )} */}
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
              {data?.data?.products?.length > 0 ? (
                data?.data?.products?.map((product: any) => (
                  <TableRow key={product?.id}>
                    <TableCell className="font-medium">
                      {product?.code || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {product?.main_image && (
                          <img
                            src={product?.main_image}
                            alt={product?.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                        )}
                        <span>{product?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product?.category_name}</TableCell>
                    <TableCell>{formatPrice(Number(product?.price))}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          product?.totalQuantity === 0
                            ? "text-red-600"
                            : product?.totalQuantity < 20
                              ? "text-orange-600"
                              : "text-green-600"
                        }`}
                      >
                        {product?.totalQuantity ?? 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={!!product?.active}
                        onCheckedChange={() => {
                          setProductDetails(product);
                          setStatusModalOpen(true);
                        }}
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(product?.created_at)}
                    </TableCell>
                    <TableCell>
                      <UserActionDropdown
                        onView={() =>
                          router.push(routes.products.view(product.slug))
                        }
                        onEdit={() => router.push(routes.products.edit(product.slug))}
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
        {data?.data?.products?.length > 0 && (
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
                !!productDetails?.active,
              );
              setStatusModalOpen(false);
              setProductDetails(null);
            }
          }}
          currentStatus={productDetails?.active === 1 ? "A" : "I"}
          itemTitle={productDetails?.name || "product"}
          disabled={isChangingProductStatus}
        />
      )}
    </>
  );
}
