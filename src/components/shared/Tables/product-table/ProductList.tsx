"use client";

import { useEffect, useRef, useState } from "react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "../../../ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useChangeProductStatus,
  useDeleteProduct,
  useGetProductList,
} from "@/hooks/queries";
import { FiltersTypes } from "@/utils/types";
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import { paginationDropdownOptions } from "@/utils/data/dropdowns";
import { DeleteDialog } from "@/components/shared/Dialog/DeleteDialog/DeleteDialog";
import { useGetDropdowns } from "@/hooks/useGetDropdowns";
import { routes } from "@/constants/routes";
import StatusModal from "@/components/shared/Dialog/StatusChangeDialog";
import { AddEditProductDialog } from "../../Dialog/CreateEditDialogs/AddEditProductDialog";
import UserActionDropdown from "../../User/UserActionDropdown";
import { formatDate, formatPrice } from "@/utils/helpers/commonHelpers";
import { FilterBar } from "@/components/custom-elements/FilterBar";
import { DataTable } from "@/components/table-components/DataTable";

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
  { label: "Product Name", key: "name", sortable: true },
  { label: "Category", key: "category" },
  { label: "Price", key: "price" },
  { label: "Quantity", key: "quantity" },
  { label: "Status", key: "status", className: "text-center" },
  { label: "Created At", key: "createdAt", sortable: true },
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

  const filtersConfig = [
    {
      key: "status",
      placeholder: "Filter by Status",
      width: "w-40",
      options: statusDropdown!,
    },
    {
      key: "category",
      placeholder: "Filter by Category",
      width: "w-50",
      options: categoryDropdown!,
    },
  ];

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

  const handleSort = (key: any) => {
    setFilters((prev) => ({
      ...prev,
      sort_by: key,
      sort_order: prev.sort_order === "asc" ? "desc" : "asc",
    }));
  };

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
      total_pages: data?.data?.pagination.total_pages ?? prev.total_pages,
      total_items: data?.data?.pagination?.total ?? prev.total_items,
    }));
  }, [isLoading]);

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
          <FilterBar
            searchValue={searchTerm}
            onSearchChange={handleSearch}
            onSearchClear={() => {
              setSearchTerm("");
              setFilters((prev) => ({ ...prev, search: "" }));
            }}
            filters={filtersConfig}
            values={{
              search: filters.search,
              status: filters.status,
              category: filters.category,
            }}
            onChange={(key, value) => {
              setFilters((prev) => ({
                ...prev,
                [key]: value,
              }));
            }}
            onClearFilters={() => {
              setFilters((prev) => ({
                ...prev,
                search: "",
                status: undefined,
                category: undefined,
              }));
              setSearchTerm("");
            }}
            // className="pt-2"
          />

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

        <DataTable
          columns={columns}
          data={data?.data?.products}
          isLoading={isLoading}
          colSpan={8}
          onSort={handleSort}
          pagination={{
            currentPage: filters.page!,
            totalPages: filters.total_pages!,
            itemsPerPage: filters.limit!,
            totalItems: filters.total_items || 0,
            onPageChange: (page) =>
              setFilters((prev) => ({
                ...prev,
                page,
              })),
          }}
          renderRow={(product: any) => (
            <TableRow key={product?.id}>
              {/* Product Code */}
              <TableCell className="font-medium">
                {product?.code || "-"}
              </TableCell>

              {/* Product Name */}
              <TableCell className="w-[350px] max-w-[350px]">
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

              {/* Category */}
              <TableCell>{product?.category_name}</TableCell>

              {/* Price */}
              <TableCell>{formatPrice(Number(product?.price))}</TableCell>

              {/* Quantity */}
              <TableCell>
                <span
                  className={
                    product?.totalQuantity === 0
                      ? "text-red-600"
                      : product?.totalQuantity < 20
                        ? "text-orange-600"
                        : "text-green-600"
                  }
                >
                  {product?.totalQuantity ?? 0}
                </span>
              </TableCell>

              {/* Status */}
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

              {/* Created At */}
              <TableCell className="whitespace-nowrap">
                {formatDate(product?.created_at)}
              </TableCell>

              {/* Actions */}
              <TableCell>
                <UserActionDropdown
                  onView={() => router.push(routes.products.view(product.slug))}
                  onEdit={() => router.push(routes.products.edit(product.slug))}
                  onDelete={() => {
                    setIsDeleteOpen(true);
                    setProductId(product.id);
                  }}
                />
              </TableCell>
            </TableRow>
          )}
        />
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
              handleStatusChange(productDetails?.id, !!productDetails?.active);
              setStatusModalOpen(false);
              setProductDetails(null);
            }
          }}
          currentStatus={productDetails?.active === 1 ? "A" : "I"}
          itemTitle={productDetails?.name || "product"}
          isLoading={isChangingProductStatus}
        />
      )}
    </>
  );
}
