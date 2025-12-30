import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UserTypeBadgeProps {
  type: "business" | "user" | undefined;
  label?: string;
  className?: string;
}

const UserTypeBadge: React.FC<UserTypeBadgeProps> = ({ type, label, className }) => {
  if(!type) return <></>;
  
  const config = {
    // all: {
    //   label: "All Users",
    //   className: "bg-slate-600 text-white border-0 hover:bg-slate-700",
    // },
    business: {
      label: "Business Only",
      className: "bg-blue-600 text-white border-0 hover:bg-blue-700",
    },
    user: {
      label: "Normal User",
      className: "bg-emerald-600 text-white border-0 hover:bg-emerald-700",
    },
  }[type];

  return (
    <>
      {type ? <div className="flex flex-col ">
        {label && <label className="mb-1 text-body-sm font-medium text-dark">{label}</label>}
        <Badge
          className={cn(
            "text-xs font-semibold px-3 py-1 rounded-full shadow-md transition-all duration-200 w-fit",
            config.className,
            className
          )}
        >
          {config.label}
        </Badge>
      </div> :
        <> </>}
    </>
  );
};

export default UserTypeBadge;