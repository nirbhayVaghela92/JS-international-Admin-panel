import { Pencil } from "lucide-react";
import { forwardRef, useState } from "react";

interface UploadPhotoFormProps {
  name?: string;
  onChange?: (file: File | null) => void;
  onBlur?: () => void;
  value?: any;
  error?: boolean;
  errorMessage?: string;
  defaultImage?: string;
  className?: string;
}

export const UploadPhotoForm = forwardRef<
  HTMLInputElement,
  UploadPhotoFormProps
>(
  (
    {
      name = "profile_image",
      onChange,
      onBlur,
      value,
      error,
      errorMessage,
      defaultImage = "/images/user/user-03.png",
      className = "",
    },
    ref,
  ) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;

      if (file) {
        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Call onChange callback
        onChange?.(file);
      } else {
        setPreviewUrl(null);
        onChange?.(null);
      }
    };

    const getImageSrc = () => {
      if (previewUrl) return previewUrl;
      if (typeof value === "string" && value) return value;
      return defaultImage;
    };

    return (
      <div className={className}>
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={getImageSrc()}
              alt="User"
              className={`size-14 h-35 w-35 rounded-full border object-cover ${
                error ? "border-red-500" : "border-gray-400"
              }`}
            />

            <div className="absolute bottom-3 end-3 w-fit">
              <input
                ref={ref}
                type="file"
                name={name}
                id={name}
                accept="image/png, image/jpg, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
                onBlur={onBlur}
              />

              <label htmlFor={name}>
                <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary p-0.5 transition-opacity hover:opacity-80">
                  <Pencil className="h-3 w-3 text-white" />
                </div>
              </label>
            </div>
          </div>
        </div>

        {error && errorMessage && (
          <p className="mt-2 text-center text-sm text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

UploadPhotoForm.displayName = "UploadPhotoForm";
