import { DropdownOption } from "@/utils/types";

type UseGetDropdownsProps = {
  isStatusDropdown?: boolean;
  isCategoryDropdown?: boolean;
  isQueryStatusDropdown?: boolean;
  params?: {
    limit?: number;
    page?: number;
    search?: string;
  };
};

export type Dropdowns = {
  statusDropdown?: DropdownOption[];
  categoryDropdown?: DropdownOption[];
  queryStatusDropdown?: DropdownOption[];
};

const addNAOption = (list: any[]) => [...list, { value: -1, label: "N/A" }];
const addAllOption = (list: any[]) => [{ value: "all", label: "All" }, ...list];

export const useGetDropdowns = ({
  isStatusDropdown = false,
  isCategoryDropdown = false,
  isQueryStatusDropdown = false,
}: UseGetDropdownsProps) => {
  const dropdowns: Dropdowns = {};

  // Status Dropdown
  if (isStatusDropdown) {
    let list = [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ];
    dropdowns.statusDropdown = list;
  }
  if (isCategoryDropdown) {
    dropdowns.categoryDropdown = [
      { label: "Watches for Men", value: "watches-men" },
      { label: "Watches for Women", value: "watches-women" },
      { label: "Purse", value: "purse" },
      { label: "Jewellery", value: "jewellery" },
    ];
  }

  if (isQueryStatusDropdown) {
    dropdowns.queryStatusDropdown = [
      { label: "Pending", value: "pending" },

      { label: "Resolved", value: "resolved" },
    ];
  }
  return dropdowns;
};
