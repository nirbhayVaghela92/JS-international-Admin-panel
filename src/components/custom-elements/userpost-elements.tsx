import React from "react";
import TooltipWrapper from "./TooltipWrapper";
import { cn } from "@/lib/utils";

function Points({ points, className }: { points: number; className?: string }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      {points} PTS
    </span>
  );
}

function PostStatus({
  status,
  onClick,
  className,
  isAction = true,
}: {
  status: string;
  onClick?: () => void;
  className?: string;
  isAction?: boolean;
}) {
  return (
    <>
      {isAction ? (
        <TooltipWrapper content="Change Status">
          <span
            className={`mt-1 w-fit cursor-pointer rounded-full px-3 py-1 text-xs font-medium ${className} ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
            onClick={() => onClick?.()}
          >
            {status}
          </span>
        </TooltipWrapper>
      ) : (
        <span
          className={`mt-1 w-fit cursor-default rounded-full px-3 py-1 text-xs font-medium ${className} ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
          onClick={() => onClick?.()}
        >
          {status}
        </span>
      )}
    </>
  );
}
export { Points, PostStatus };
