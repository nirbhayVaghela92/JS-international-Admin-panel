import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icon/icons";
import { cn } from "@/lib/utils";
import type { JSX, SVGProps } from "react";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    growthRate?: number;
  };
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export function OverviewCard({ label, data, Icon }: PropsType) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-dark">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
        <Icon className="text-xl text-dark dark:text-white" />
      </div>

      {/* Content */}
      <div>
        <dt className="text-xl font-bold text-dark dark:text-white">
          {data.value}
        </dt>
        <dd className="text-sm font-medium text-dark-6">{label}</dd>
      </div>
    </div>
  );
}
