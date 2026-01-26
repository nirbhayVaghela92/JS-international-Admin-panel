import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";;
import { Loader } from "../custom-elements/Loader";
import { SortIcon } from "@/assets/icon";

type Column = {
  key: string;
  label: string;
  className?: string;
  sortable?: boolean;
};

type DataTableProps<T = any> = {
  columns: Column[];
  data?: T[];
  isLoading?: boolean;
  colSpan: number;

  renderRow: (item: T, index?: number) => React.ReactNode;
  onSort?: (key: string) => void;

  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;

  pagination?: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  };
};

export function DataTable<T>({
  columns,
  data = [],
  isLoading = false,
  colSpan,
  renderRow,
  onSort,
  loadingComponent = <Loader />,
  emptyComponent = "No Data Found",
  pagination,
}: DataTableProps<T>) {
  return (
    <>
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={`select-none ${col.className ?? ""}`}
              >
                <div
                  className={`flex items-center gap-1 ${
                    col.sortable ? "cursor-pointer" : ""
                  }`}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  {col.label}
                  {col.sortable && <SortIcon className="h-4 w-4 opacity-70" />}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={colSpan} rowSpan={9} className="text-center">
                {loadingComponent}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && data.length > 0 && data.map(renderRow)}

          {!isLoading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={colSpan} rowSpan={15} className="text-center">
                <div className="mx-auto max-w-7xl p-6">
                  <div className="flex flex-col h-[50vh] items-center justify-center gap-3">
                    {emptyComponent}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && data.length > 0 && <TablePagination {...pagination} />}
    </>
  );
}
