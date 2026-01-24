import dayjs from "dayjs";
import { DropdownOption } from "../types";


export function formatPrice(price: number | undefined): string {
  if (typeof price !== "number" || isNaN(price)) return "";

  return price.toLocaleString("en-IN");
}

export const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${imagePath}`;
}

export const getDrodopwnValueFromLabel = (lable: string, dropdown: DropdownOption[]): string => {
  const option = dropdown.find((opt) => opt.label === lable);
  return option ? String(option.value) : "";
};

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

export function getFileType(type: string): "image" | "video" | "audio" {
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  return "image"; // default to image
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

export function compactFormat(value: number) {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });

  return isNaN(value) ? "-" : formatter.format(value);
}

export const getkeyByLabel = (label: string, dropdown: DropdownOption[]):string => {
  console.log(label, dropdown, "input");
  const option = dropdown.find((opt) => opt.label === label);
  console.log(option, "OP")
  return option ? option.value as string : "";
};