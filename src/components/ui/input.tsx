import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, required, error, errorMessage, id, ...props },
    ref,
  ) => {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={id}
            className="text-body-sm font-medium text-dark dark:text-white"
          >
            {label}
            {required && <span className="ml-1 select-none text-red">*</span>}
          </label>
        )}
        <div className="relative mt-1 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2">
          <input
            id={id}
            ref={ref}
            type={type}
            className={cn(
              // "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "w-full rounded-lg border bg-white px-4 py-2 text-sm text-dark shadow-sm outline-none placeholder:text-dark-6 focus:outline-none focus:ring-1 dark:text-white",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
            )}
            {...props}
          />
        </div>
        {error && errorMessage && (
          <p className="mt-1 text-sm font-[14px] text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
