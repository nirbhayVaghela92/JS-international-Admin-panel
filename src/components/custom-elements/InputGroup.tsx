import { cn } from "@/lib/utils";
import { type HTMLInputTypeAttribute, useId } from "react";

type InputGroupProps = {
  className?: string;
  label: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  fileStyleVariant?: "style1" | "style2";
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  height?: "sm" | "default";
  autoComplete?: string;
  defaultValue?: string;
  error?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
};

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  label,
  type,
  placeholder,
  required,
  disabled,
  active,
  icon,
  error,
  errorMessage,
  onChange,
  name,
  value,
  defaultValue,
  autoComplete,
  ...props
}) => {
  const id = useId();

  // Check if this is a phone number field
  const isPhoneField =
    name === "phone_number" || name === "phone" || name === "phoneNumber" || name === "number";

  // Handle key press for phone number fields
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isPhoneField && type === "text") {
      const char = e.key;

      // Allow control keys (backspace, delete, tab, escape, enter, etc.)
      if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Tab" ||
        e.key === "Escape" ||
        e.key === "Enter" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.ctrlKey ||
        e.metaKey
        // (e.key === "a" && e.ctrlKey) || // Allow Ctrl+A
        // (e.key === "c" && e.ctrlKey) || // Allow Ctrl+C
        // (e.key === "v" && e.ctrlKey) || // Allow Ctrl+V
        // (e.key === "x" && e.ctrlKey) // Allow Ctrl+X
      ) {
        return;
      }

      // Allow only numeric characters (0-9)
      const numericPattern = /^[0-9]$/;
      if (!numericPattern.test(char)) {
        e.preventDefault();
      }
    }
  };

  // Handle paste events for phone number fields
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (type === "phoneNumber") {
      const pastedText = e.clipboardData.getData("text").trim();

      // Allow: +, digits, space, -, (, )
      const phonePastePattern = /^[+\d\s()-]+$/;

      if (!phonePastePattern.test(pastedText)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && <span className="ml-1 select-none text-red">*</span>}
      </label>
      <div
        className={cn(
          "mt-1 relative [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
          props.iconPosition === "left"
            ? "[&_svg]:left-4.5"
            : "[&_svg]:right-4.5",
        )}
      >
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onKeyDown={handleKeyPress}
          onPaste={handlePaste}
          onChange={(e) => {
            if (isPhoneField && type === "text") {
              const allowedChars = /^[\d\s()+-]*$/; // only allow common phone number chars
              if (!allowedChars.test(e.target.value)) return;
            } else if (type === "number") {
              const val = e.target.value;
              if (val === "" || parseFloat(val) <= 0) {
                e.preventDefault();
              }
            }
            onChange?.(e);
          }}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            // "w-full rounded-lg border-[1.5px] border-stroke bg-transparent text-sm outline-none transition focus:border-primary focus:ring-1 disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary",
            "w-full rounded-lg border bg-white text-sm shadow-sm outline-none focus:outline-none focus:ring-1",
            type === "file"
              ? getFileStyles(props.fileStyleVariant!)
              : "px-3 py-2 text-sm text-dark placeholder:text-dark-6 dark:text-white",
            props.iconPosition === "left" && "pl-12.5",
            props.height === "sm" && "py-2.5",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-primary focus:ring-primary",
          )}
          required={required}
          disabled={disabled}
          data-active={active}
          {...props}
        />
        {name === "search" && value ? icon : name !== "search" && icon}
      </div>

      {error && errorMessage && (
        <p className="mt-1 text-sm font-[14px] text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputGroup;

function getFileStyles(variant: "style1" | "style2") {
  switch (variant) {
    case "style1":
      return `file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white`;
    default:
      return `file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 file:focus:border-primary dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white px-3 py-[9px]`;
  }
}
