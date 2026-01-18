"use client";
import { ReactNode } from "react";
import BackButton from "./BackButton";

interface BreadcrumbProps {
  pageName: string;
  isShowBackButton?: boolean;
  previousPage?: string;
  breadcrumbTrail?: ReactNode;
  lastButton?: ReactNode;
}

const Breadcrumb = ({
  pageName,
  isShowBackButton = false,
  previousPage = "",
  breadcrumbTrail,
  lastButton,
}: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          {isShowBackButton && <BackButton previousPage={previousPage} />}
          <h2 className="text-[26px] font-bold leading-[30px] text-foreground">
            {pageName}
          </h2>
        </div>

        {breadcrumbTrail && (
          <div className="mt-1 text-sm text-muted-foreground">
            {breadcrumbTrail}
          </div>
        )}
      </div>

      {lastButton && <div>{lastButton}</div>}
    </div>
  );
};

export default Breadcrumb;
