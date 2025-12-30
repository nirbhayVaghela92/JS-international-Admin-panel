export interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  photo: string;
  status: "Active" | "Inactive";
}

export interface ParmasType {
  limit?: number;
  group_id?: number;
  page?: number;
  per_page?: number;
  search?: string;
  enabled?: boolean;
  master_category_id?: number;
  sub_category_id?: number | "all";
  master_post_category_id?: number;
  id?: number;
  reportStatus?: "pending" | "solved" | "blocked" | "all" | undefined;
  sortBy?: string;
  status?: "Active" | "Inactive" | string | undefined;
  sort_order?: "asc" | "desc";
  sort_by?: string;
  admin_post_id?: number;
  post_type?: number;
  university_id?: number;
  state_id?: number;
  keyword?: string;
  userType?: "business" | "user";
  industry_id?: number | undefined;
  business_size_id?: number | undefined;
  verification_status?:
    | "pending"
    | "verified"
    | "not_applied"
    | "rejected"
    | undefined;
  userId?: number | undefined;
  businessId?: number | undefined;
  rewardAdventureId?: number | undefined;
  redeemStatus?: RedeemStatus;
  region?: string | undefined;
  createdBy?: CreatedBy | undefined;
  approvalStatus?: "requested" | "approved" | "rejected";
  regionType?: Presence;
  regionUnlockedStatus?: RegionLockStatus | undefined;
  presence?: Presence | undefined;
  stripSubscriptionStatus?: SubscriptionStatus | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined; 
}

export interface ParmasTypeForBadge {
  page?: number;
  limit?: number;
  status?: null | "active" | "inactive";
  search?: string;
  badgeType?: "points_based" | "custom" | "all" | "contest_badge";
  total_pages?: number;
  total_items?: number;
}

export interface SubCategoryType {
  id: number;
  description: string;
  points: number;
  title: string;
  cover_image: string;
  status: "A" | "I";
  short_description?: string;
  user_type?: UserType;
  stripSubscriptionStatus?: SubscriptionStatus | undefined;
}

export interface ChallengeType {
  images: string | { file_name: string } | undefined;
  id: number;
  title: string;
  description: string;
  points: number;
  photo: string;
  status: "A" | "I";
}

export interface DropdownOption {
  value: string | number;
  label: string;
}

export interface FiltersTypes {
  total_items?: number;
  total_pages: number;
  page: number;
  limit: number;
  state_id?: number | undefined;
  master_category_id?: number | undefined;
  sub_category_id?: number | undefined;
  status?: "A" | "I" | "all" | undefined;
  reportStatus?: "pending" | "solved" | "blocked" | "all" | undefined;
  search?: string | undefined;
  sort_by?: string | undefined;
  sort_order?: "asc" | "desc" | undefined;
  university_id?: number;
  business_size_id?: number | undefined;
  industry_id?: number | undefined;
  userType?: UserType;
  verification_status?:
    | "pending"
    | "verified"
    | "not_applied"
    | "rejected"
    | undefined;
  rewardAdventureId?: number | undefined;
  redeemStatus?: RedeemStatus;
  postType?: number | undefined;
  region?: "NA" | "SA" | "Sd" | "Ss" | undefined;
  userId?: number | undefined;
  presence?: Presence | undefined;
  regionUnlockedStatus?: RegionLockStatus | undefined;
  categoryId?: number | undefined
  businessId?: number | undefined;
  stripSubscriptionStatus?: SubscriptionStatus | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}

export interface Badge {
  id: number;
  name: string;
  status: "active" | "inactive";
  cover_image: string;
  type: "points_based" | "custom";
  sub_type?: "total_points" | "stats_points";
  category?:
    | "my_good_life"
    | "adventures"
    | "contests"
    | "challenges"
    | "zaz_on_the_streets"
    | "encouragements"
    | "shares";
  user_type?: UserType;
  description?: string;
  points: number;
}

export type UserType = "business" | "user";

export type FileType = "image" | "audio" | "video" | "media";

export type BusinessVerificationType =
  | "rejected"
  | "verified"
  | "pending"
  | "not_applied";

export type ContestRequestStatus = "requested" | "approved" | "rejected";

export type RedeemStatus = "Completed" | "Redeemed" | "Expired";

export type CreatedBy = "business" | "zazu";

export type Presence = "local" | "online" | "both";

export type RegionLockStatus = "locked" | "unlocked";

export type SubscriptionStatus = "active" | "canceled" | "past_due" | "unpaid";