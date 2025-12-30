"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import TooltipWrapper from "../../custom-elements/TooltipWrapper";

type ActionIconsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  userId?: string;
  email?: string;
};

export const TableActions = ({
  onView,
  onEdit,
  onDelete,
}: ActionIconsProps) => {
  const iconWrapper =
    "group rounded-md bg-muted p-2 border border-transparent transition hover:border-primary hover:bg-accent";
  const iconStyle = "h-4 w-4 text-muted-foreground group-hover:text-primary";

  const actions = [
    {
      label: "View",
      Icon: Eye,
      onClick: () => onView && onView(),
      color: "text-indigo-600",
      show: onView,
    },
    {
      label: "Edit",
      Icon: Pencil,
      onClick: onEdit,
      color: "text-blue-600",
      show: onEdit, 
    },
    {
      label: "Delete",
      Icon: Trash2,
      onClick: onDelete,
      color: "text-red-600",
      show: onDelete,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {actions
        .filter((action) => action.show) 
        .map(({ label, Icon, onClick, color }, index) => (
          <TooltipWrapper content={label} key={index}>
            <button
              onClick={onClick}
              className={iconWrapper}
              aria-label={label}
              type="button"
            >
              <Icon className={`${iconStyle} ${color}`} />
            </button>
          </TooltipWrapper>
        ))}
    </div>
  );
};
