// components/FilterBar.tsx
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import InputGroup from "@/components/custom-elements/InputGroup";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import useSearchFilters from "@/hooks/useSearchFilters";

type FilterOption = {
  label: string;
  value: string | number;
};

type FilterConfig = {
  key: string;
  placeholder: string;
  width?: string;
  options: FilterOption[];
};

type FilterBarProps = {
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderExtraFilters?: () => React.ReactNode;
  onSearchClear?: () => void;

  filters: FilterConfig[];
  values: Record<any, any>;
  onChange: (key: string, value: any) => void;
  onClearFilters?: () => void;
  className?: string;
};

export function FilterBar({
  searchValue,
  onSearchChange,
  onSearchClear,
  filters,
  values,
  onChange,
  onClearFilters,
  renderExtraFilters,
  className,
}: FilterBarProps) {
  const hasActiveFilters = Object.values(values).some(Boolean);
  const {  updateSearchParams, clearFiltersWithSearchParams } = useSearchFilters();

  return (
    <div
      className={cn("my-3 rounded-xl border bg-white p-4 shadow-sm", className)}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        {/* Search */}
        {onSearchChange && (
          // <div className=" max-w-md flex-1">
          <InputGroup
          label=""
            className="w-[300px]"
            name="search"
            type="text"
            icon={
              <X
                className="h-5 w-5 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200"
                onClick={() => {
                  onSearchClear?.();
                  updateSearchParams("search", "");
                }}
              />
            }
            placeholder="Search here..."
            value={searchValue}
            onChange={(e) => {
              onSearchChange(e);
              updateSearchParams("search", e.target.value);
            }}
          />
          // </div>
        )}

        {/* Dropdown Filters */}
        {filters.map((filter) => (
          <CustomDropdown
            // key={filter.key}
            // placeholder={filter.placeholder}
            width={filter.width ?? "w-44"}
            // options={filter.options}
            value={values[filter.key]}
            onChange={(value) => {
              onChange(filter.key, value);
              updateSearchParams(filter.key, value);
            }}
            {...filter}
          />
        ))}

        {/* Custom / Advanced Filters (Timeframe, DateRange, etc.) */}
        {renderExtraFilters?.()}

        {/* Clear Filters */}
        {hasActiveFilters && onClearFilters && (
          <button
            onClick={() => {
              onClearFilters();
              clearFiltersWithSearchParams();
              // const params = new URLSearchParams(searchParams.toString());
              // Array.from(params.keys()).forEach((key) => {
              //   if (key !== "page") {
              //     params.delete(key);
              //   }
              // });

              // router.replace(`?${params.toString()}`, { scroll: false });
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
