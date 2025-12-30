import { DropdownOption } from "../types";


export const reportStautsDropdownOptions: DropdownOption[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "solved", label: "Solved" },
  { value: "blocked", label: "Blocked" },
];

export const paginationDropdownOptions: DropdownOption[] = [
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

export const paginationDropdownOptionsForUniversity: DropdownOption[] = [
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

export const genderDropdownOptions: DropdownOption[] = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  // { value: "O", label: "Other" },
];


export const badgeTypeDropdown: DropdownOption[] = [
  { value: "points_based", label: "Points based" },
  { value: "custom", label: "Manual Badge" },
  // { value: "contest_badge", label: "Contest Badge" },
]

export const badgeSubTypeDropdown: DropdownOption[] = [
  { value: "total_points", label: "Total points based" },
  { value: "stats_points", label: "Category points based" }
]

export const userTypeDropdown: DropdownOption[] = [
  // { value: "all", label: "All users (Business and Normal)" },
  { value: "user", label: "Normal users only" },
  { value: "business", label: "Business accounts only" },
];

export const businessVerificationStatusDropdown: DropdownOption[] = [
  // { value: "all", label: "All users (Business and Normal)" },
  { value: "not_applied", label: "Not Applied" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
];

export const businessRewardsStatusDropdown: DropdownOption[] = [
  // { value: "all", label: "All users (Business and Normal)" },
  { value: "Completed", label: "Completed" },
  { value: "Redeemed", label: "Redeemed" },
  { value: "Expired", label: "Expired" },
];

export const rewardAdventuresDropdown: DropdownOption[] = [
  { value: 2, label: "New Explorer" },
  { value: 34, label: "Treasure Seeker" },
  { value: 44, label: "Quest Champion" },
  { value: 32, label: "Mystic Voyager" },
  { value: 34, label: "Epic Trailblazer" },
  { value: 54, label: "Legend Hunter" },
  { value: 64, label: "Mythic Conqueror" },
  { value: 784, label: "Eternal Hero" },
]

export const redeemStatusDropdown: DropdownOption[] = [
  { value: "Completed", label: "Completed" },
  { value: "Redeemed", label: "Redeemed" },
  { value: "Expired", label: "Expired" },
];

export const userPostCategoryDropdown: DropdownOption[] = [
  // { value: 1, label: "Daily Wins" },
  { value: 7, label: "Global Posts" },
  { value: 6, label: "Reward Posts" },
  { value: 2, label: "Challenges Posts" },
  // { value: 3, label: "Contest" },
  // { value: 4, label: "Spotlight" },
];