import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: "Live" | "Pause" | "Archived" }) {
  const statusConfig = {
    Live: {
      label: "Live",
      className:
        "bg-green-100 text-green-700 text-xs font-medium  border-emerald-700 shadow-sm",
      dotColor: "bg-white",
      animate: true,
    },
    Pause: {
      label: "Paused",
      className:
        "bg-red-100 text-red-700 text-xs font-medium border-amber-700 shadow-sm",
      dotColor: "bg-white",
      animate: false,
    },
    Archived: {
      label: "Archived",
      className:
        "bg-gray-100 text-gray-700 text-xs font-medium border-gray-300 shadow-sm",
      dotColor: "bg-gray-500",
      animate: false,
    },
  };

  const config = statusConfig[status];

  if (!config?.label) return null;

  return (
    <div
      className={cn(
        "mt-1 w-fit cursor-pointer rounded-full px-3 py-1 text-xs font-medium",

        config?.className || "",
      )}
    >
      {config?.label}
    </div>
  );
}

export default StatusBadge;
