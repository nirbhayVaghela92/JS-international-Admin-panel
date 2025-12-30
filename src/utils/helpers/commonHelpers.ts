import dayjs from "dayjs";
import { BusinessVerificationType, ContestRequestStatus } from "../types";
import { DateFilterName } from "@/components/custom-elements/TimeFrameFilter";

export const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatNumber = (count: number, isAllowK: boolean = true) => {
  if (count === null || count === undefined) return "0";
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000 && isAllowK) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
};

export const formatDate = (date: string) => {
  if (!date) return "";
  return dayjs(date).format("DD MMM, YYYY") === "Invalid Date"
    ? ""
    : dayjs(date).format("DD MMM, YYYY");
};

export function getReportStatusClasses(status: string): string {
  const statusClasses = {
    solved: "border border-green-200 bg-green-100 text-green-800",
    pending: "border border-yellow-200 bg-yellow-100 text-yellow-800",
    blocked: "border border-red-200 bg-red-100 text-red-800",
  };

  return `rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm ${statusClasses[status as keyof typeof statusClasses] || statusClasses["pending"]}`;
}

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "active":
      return "bg-green-100 text-green-800";
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "canceled":
      return "bg-red-100 text-red-800";
    case "simulated":
      return "bg-purple-100 text-purple-800";
    case "blocked":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getVerificationBadgeClass = (
  status: BusinessVerificationType | ContestRequestStatus,
) => {
  switch (status) {
    case "requested":
      return "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100";
    case "verified":
      return "border-green-200 bg-green-50 text-green-700 hover:bg-green-100";

    case "pending":
      return "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100";

    case "rejected":
      return "border-red-200 bg-red-50 text-red-700 hover:bg-red-100";

    case "not_applied":
    default:
      return "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Pending Review";
    case "solved":
      return "Solved";
    case "active":
      return "Active";
    case "blocked":
      return "Blocked";
    default:
      return "Unknown Status";
  }
};

// Example: Convert a static image from /public/images/logo.png
export async function getBlobFromStaticFile(path: string) {
  const response = await fetch(path); // fetch from public assets
  const blob = await response.blob(); // get as blob
  return blob;
}

export async function getFileFromStaticFile(path: string, filename: string) {
  const blob = await getBlobFromStaticFile(path);
  // Wrap blob into File (useful if backend expects File-like object)
  return new File([blob], filename, { type: blob.type });
}

export function getFileType(type: string): "image" | "video" | "audio" {
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  return "image"; // default to image
}

export function isBase64(str: string): boolean {
  if (!str || typeof str !== "string") return false;

  // Remove data URL scheme if present
  const cleaned = str.includes(",") ? str.split(",")[1] : str;

  // Base64 regex (allows padding with = or ==)
  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;

  // Length must be multiple of 4
  if (cleaned.length % 4 !== 0) return false;

  return base64Regex.test(cleaned);
}

export function base64ToFile(base64: string, filename: string): File {
  // Extract mime type
  const arr = base64.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";

  // Decode base64
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function compactFormat(value: number) {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });

  return isNaN(value) ? "-" : formatter.format(value);
}

// Helper function to get next day
export function getNextDay(date: Date) {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  return nextDay;
}

export const calculateDaysAndHourLeft = (date: string) => {
  const now = new Date();
  const endDate = new Date(date);

  const diffMs = endDate.getTime() - now.getTime(); // total difference in milliseconds

  if (diffMs <= 0) {
    return { daysLeft: 0, hoursLeft: 0 }; // contest ended
  }

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60)); // total hours left
  const daysLeft = Math.floor(totalHours / 24); // full days left
  const hoursLeft = totalHours % 24; // remaining hours after full days

  return { daysLeft, hoursLeft };
};

export function parseDateAsLocal(dateString: string) {
  if (!dateString) return new Date();
  const [year, month, day] = dateString.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day); // JS months are 0-indexed
}

export function validateTagName(tagName: string) {
  if (!tagName.trim()) return { error: true, message: "Tag name is required." };
  if (tagName.includes(" "))
    return { error: true, message: "Tag name cannot contain spaces." };
  return { error: false, message: "" };
}

export const formatCurrency = (
  amount: number | undefined,
  currency: string | undefined,
) => {
  if (amount === undefined || currency === undefined) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const getStartEndDate = (filter: {
  timeframe: DateFilterName;
  range: { start: Date | null; end: Date | null };
}): {
  startDate: string;
  endDate: string;
} => {
  const today = new Date();

  // normalize today (avoid time issues)
  today.setHours(0, 0, 0, 0);

  let startDate: Date;
  let endDate: Date;

  switch (filter.timeframe) {
    case "Today":
      startDate = today;
      endDate = today;
      break;

    case "Yesterday":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 1);
      endDate = startDate;
      break;

    case "Last 7 Days":
      endDate = today;
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);
      break;

    case "Last 30 Days":
      endDate = today;
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 29);
      break;

    case "Last 90 Days":
      endDate = today;
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 89);
      break;

    case "Date Range":
      if (!filter.range.start || !filter.range.end) {
        throw new Error("Start and End date must be provided for Date Range");
      }
      startDate = filter.range.start;
      endDate = filter.range.end;
      break;

    default:
      throw new Error("Invalid timeframe");
  }

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};
