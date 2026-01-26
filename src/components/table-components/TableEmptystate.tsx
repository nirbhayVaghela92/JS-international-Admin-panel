import { TableBody, TableRow, TableCell } from "@/components/ui/table";

type TableEmptyStateProps = {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
};

export function TableEmptyState({
  children,
  colSpan = 1,
  rowSpan = 9,
  className = "text-center",
}: TableEmptyStateProps) {
  return (
      <TableRow>
        <TableCell
          colSpan={colSpan}
          rowSpan={rowSpan}
          className={className}
        >
          {children}
        </TableCell>
      </TableRow>
  );
}
