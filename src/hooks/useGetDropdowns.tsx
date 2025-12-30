/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  genderDropdownOptions,
  reportStautsDropdownOptions,
} from "@/utils/data/dropdowns";
import {
  useGetCountryList,
  useGetStateList,
  useGetCityList,
  useUniversityStateList,
} from "./queries/useGeneral";
import { DropdownOption, UserType } from "@/utils/types";
import { ca, is } from "date-fns/locale";

type UseGetDropdownsProps = {
  isStatusDropdown?: boolean;
  isSubCategoryDropdown?: boolean;
  isContryDropdown?: boolean;
  isStateDropdown?: boolean;
  isCityDropdown?: boolean;
  categoryId?: number;
  isAddAllOption?: boolean;
  isAddNAOption?: boolean;
  isGenderDropdown?: boolean;
  isReportStatus?: boolean;
  isUniversityStateList?: boolean;
  isBusinessSizesDropdown?: boolean;
  isBusinessIndustryDropdown?: boolean;
  isBadgesDropdown?: boolean;
  isBusinessStatusDrodown?: boolean;
  isRewardAdventureDropdown?: boolean;
  isShowCreatedByDropdown?: boolean;
  isRegionDropdown?: boolean;
  isPresenceDropdown?: boolean;
  isCategoryStatsDropdown?: boolean;
  isRegionLockStatusDropdown?: boolean;
  isBusinessListDropdown?: boolean;
  isMonthlyOnlineOrdersDropdown?: boolean;
  isPhysicalLocationsRangeDropdown?: boolean;
  isEstimatedAnnualRevenueDropdown?: boolean;
  isStripSubscriptionStatusDropdown?: boolean;
  params?: {
    limit?: number;
    page?: number;
    search?: string;
  };
};

export type Dropdowns = {
  subCategoryDropdown?: DropdownOption[];
  statusDropdown?: DropdownOption[];
  reportedPostStatus?: DropdownOption[];
  countryDropdown?: DropdownOption[];
  stateDropdown?: DropdownOption[];
  cityDropdown?: DropdownOption[];
  genderDropdown?: DropdownOption[];
  universityStateList?: DropdownOption[];
  badgesDropdown?: DropdownOption[];
  businessSizesList?: DropdownOption[];
  businessIndustryList?: DropdownOption[];
  businessStatusDropdown?: DropdownOption[];
  rewardAdventureDropdown?: DropdownOption[];
  createdByDropdown?: DropdownOption[];
  regionDropdown?: DropdownOption[];
  presenceDropdown?: DropdownOption[];
  categoryStateDropdown?: DropdownOption[];
  regionLockStatusDropdown?: DropdownOption[];
  businessListDropdown?: DropdownOption[];
  monthlyOnlineOrdersDropdown?: DropdownOption[];
  physicalLocationsRangeDropdown?: DropdownOption[];
  estimatedAnnualRevenueDropdown?: DropdownOption[];
  stripSubscriptionStatusDropdown?: DropdownOption[];
};

const addNAOption = (list: any[]) => [...list, { value: -1, label: "N/A" }];
const addAllOption = (list: any[]) => [{ value: "all", label: "All" }, ...list];

export const useGetDropdowns = ({
  isStatusDropdown = false,
  isSubCategoryDropdown = false,
  isContryDropdown = false,
  isStateDropdown = false,
  isCityDropdown = false,
  isAddAllOption = false,
  isAddNAOption = false,
  isUniversityStateList = false,
  isGenderDropdown = false,
  isReportStatus = false,
  isBusinessStatusDrodown = false,
  isRegionDropdown = false,
  isShowCreatedByDropdown = false,
  isPresenceDropdown = false,
  isCategoryStatsDropdown = false,
  isRegionLockStatusDropdown = false,
  isStripSubscriptionStatusDropdown = false,
  categoryId,
  params = {},
}: UseGetDropdownsProps) => {
  const dropdowns: Dropdowns = {};
  // Fetch data conditionally
  // let { data: rawSubCategoryList = [] } = useGetSubCategory({
  //   master_post_category_id: categoryId,
  //   ...(params.userType && { userType: params.userType }),
  //   enabled: isSubCategoryDropdown,
  // });

  // const { data: rawStateList = [] } = useGetStateList({
  //   enabled: isStateDropdown && !!params.country_id,
  //   country_id: params.country_id ?? "",
  // });

  // const { data: rawCityList = [] } = useGetCityList({
  //   enabled: isCityDropdown && !!params.state_id,
  //   state_id: params.state_id ?? "",
  //   country_id: params.country_id ?? "",
  //   search: params.search,
  // });

  // const { data: rawUniversityStateList } = useUniversityStateList({
  //   enabled: isUniversityStateList,
  // });

  // Build Monthly Online Orders Dropdown
  // Build dropdowns
  // Sub Category Dropdown
  // if (isSubCategoryDropdown) {
  //   // rawSubCategoryList = rawSubCategoryList.filter((itm:any) => itm.status == "A");
  //   let list = rawSubCategoryList.map((item: any) => ({
  //     value: item.id,
  //     label: capitalizeWords(item.title),
  //   }));
  //   dropdowns.subCategoryDropdown = list;
  // }

  // Status Dropdown
  if (isStatusDropdown) {
    let list = [
      { value: "A", label: "Active" },
      { value: "I", label: "Inactive" },
    ];
    dropdowns.statusDropdown = list;
  }
  if (isReportStatus) {
    dropdowns.reportedPostStatus = reportStautsDropdownOptions;
  }

  // Country, State, City Dropdowns
  if (isContryDropdown) {
    // let list = rawCountryList.map((item: any) => ({
    //   value: item.id,
    //   label: item.name,
    // }));
    let list = [
      {
        value: "233",
        label: "United States",
      },
    ];
    dropdowns.countryDropdown = list;
  }
  // if (isStateDropdown && params.country_id) {
  //   let list = rawStateList.map((item: any) => ({
  //     value: item.id,
  //     label: item.name,
  //   }));
  //   if (isAddNAOption) list = addNAOption(list);
  //   if (isAddAllOption) list = addAllOption(list);
  //   dropdowns.stateDropdown = list;
  // }
  // if (isCityDropdown && params.state_id) {
  //   let list = rawCityList.map((item: any) => ({
  //     value: item.id,
  //     label: item.name,
  //   }));
  //   if (isAddNAOption) list = addNAOption(list);
  //   if (isAddAllOption) list = addAllOption(list);
  //   dropdowns.cityDropdown = list;
  // }

  // Gender Dropdown
  if (isGenderDropdown) {
    dropdowns.genderDropdown = genderDropdownOptions;
  }

  // if (isUniversityStateList) {
  //   dropdowns.universityStateList =
  //     rawUniversityStateList?.map((item: any) => ({
  //       value: item.id,
  //       label: item.state_name,
  //     })) || [];
  // }

  if (isBusinessStatusDrodown) {
    const statusDropdown: DropdownOption[] = [
      // { value: "all", label: "All" },
      { value: "A", label: "Active" },
      { value: "I", label: "Suspended" },
    ];
    dropdowns.businessStatusDropdown = statusDropdown;
  }

  if (isShowCreatedByDropdown) {
    const createdByDropdown: DropdownOption[] = [
      { value: "business", label: "Business" },
      { value: "zazu", label: "Zazu" },
    ];
    dropdowns.createdByDropdown = createdByDropdown;
  }

  if (isPresenceDropdown) {
    const presenceDropdown: DropdownOption[] = [
      { value: "local", label: "Local" },
      { value: "online", label: "Online" },
      { value: "both", label: "Both" },
    ];
    dropdowns.presenceDropdown = presenceDropdown;
  }

  // TODO add contests dropdown
  if (isCategoryStatsDropdown) {
    const categoryStateDropdown: DropdownOption[] = [
      { value: "posts", label: "Posts" },
      { value: "rewards", label: "Rewards" },
      { value: "challenges", label: "Challenges" },
      // { value: "Contests", label: "Contests" },
      { value: "encouragements", label: "Encouragements" },
      { value: "shares", label: "Shares" },
    ];
    dropdowns.categoryStateDropdown = categoryStateDropdown;
  }

  if (isRegionLockStatusDropdown) {
    const regionLockStatusDropdown: DropdownOption[] = [
      { value: "unlocked", label: "Unlocked" },
      { value: "locked", label: "Locked" },
    ];
    dropdowns.regionLockStatusDropdown = regionLockStatusDropdown;
  }

  if (isStripSubscriptionStatusDropdown) {
    const stripSubscriptionStatusDropdown: DropdownOption[] = [
      { value: "active", label: "Active" },
      { value: "canceled", label: "Canceled" },
      { value: "past_due", label: "Past Due" },
      { value: "unpaid", label: "Unpaid" },
    ];
    dropdowns.stripSubscriptionStatusDropdown = stripSubscriptionStatusDropdown;
  }

  return dropdowns;
};
