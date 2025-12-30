import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-transparent",

        secondary: "bg-secondary text-secondary-foreground border-transparent",

        outline: "border border-input bg-transparent text-foreground",

        success: "bg-green-500/15 text-green-700 border-green-300",

        info: "bg-blue-500/15 text-blue-700 border-blue-300",

        warning: "bg-amber-500/20 text-amber-800 border-amber-300",

        danger: "bg-red-500/15 text-red-700 border-red-300",

        neutral: "bg-gray-100 text-gray-700 border-gray-300",

        unlocked: "bg-emerald-100 text-emerald-700 border border-emerald-300",
        locked: "bg-slate-100 text-slate-700 border border-slate-300",

        tag: "border-green-200 bg-green-50 font-medium text-green-700",
        user: "bg-indigo-100 text-indigo-700",

        scheduled: "bg-blue-100 text-blue-700 border border-blue-300",
        canceled: "bg-red-100 text-red-700 border border-red-300",
        simulated: "bg-purple-100 text-purple-700 border border-purple-300",

        // admin: "bg-emerald-100 text-emerald-700",
        admin: "bg-orange-100 text-orange-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
