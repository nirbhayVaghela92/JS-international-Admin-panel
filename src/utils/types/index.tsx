export interface DropdownOption {
  value: string | number;
  label: string;
}

export interface FiltersTypes {
  total_items?: number;
  total_pages?: number;
  page?: number;
  limit?: number;
  status?: "active" | "inactive" | "all" | undefined;
  search?: string | undefined;
  sort_by?: string | undefined;
  sort_order?: "asc" | "desc" | undefined;
  category?: CategoryType | undefined;
  deleted?: boolean
}

export type CategoryType =
  | "watches-men"
  | "watches-women"
  | "purse"
  | "jewellery";
export type FileType = "image" | "audio" | "video" | "media";

export type QueryStatusType = "pending" | "resolved";