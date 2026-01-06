"use client";
import {
  CircleX,
  X,
  FileAudio,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type FileType = "image" | "audio" | "pdf";

interface UploadZoneProps {
  label?: string;
  name: string;
  getValues: any;
  setValue: any;
  className?: string;
  error?: string | any;
  viewComp?: boolean;
  disabled?: boolean;
  show?: boolean;
  preview?: string;
  setPreview?: any;
  cancle?: boolean;
  removedImages?: any;
  setRemovedImages?: any;
  multiple?: boolean;
  title?: string;
  description?: string;
  fileType?: FileType;
  maxFiles?: number;
  isStaticPreview?: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({
  name,
  label,
  getValues,
  setValue,
  error,
  disabled,
  show,
  removedImages,
  setRemovedImages,
  cancle,
  multiple = false,
  title,
  description,
  fileType = "image",
  maxFiles = 6,
  isStaticPreview = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();
  const [previews, setPreviews] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);
  const [showUploadBox, setShowUploadBox] = useState(true);

  // File type configurations
  const fileTypeConfig = {
    image: {
      accept: "image/*",
      mimeCheck: (file: File) => file.type.startsWith("image/"),
      defaultTitle: "Click to upload image",
      defaultDescription: "Drag and drop image here",
      icon: ImageIcon,
      previewType: "image",
    },
    audio: {
      // accept: "audio/*",
      // mimeCheck: (file: File) => file.type.startsWith("audio/"),
      accept: ".mp3,.wav,.ogg,.m4a",
      mimeCheck: (file: File) =>
        file.type.startsWith("audio/") &&
        /\.(mp3|wav|ogg|m4a)$/i.test(file.name),
      defaultTitle: "Click to upload audio",
      defaultDescription: "Drag and drop audio file here",
      icon: FileAudio,
      previewType: "audio",
    },
    pdf: {
      accept: ".pdf,application/pdf",
      mimeCheck: (file: File) => file.type === "application/pdf",
      defaultTitle: "Click to upload PDF",
      defaultDescription: "Drag and drop PDF file here",
      icon: FileText,
      previewType: "pdf",
    },
  };

  const config = fileTypeConfig[fileType];
  const displayTitle = title || config.defaultTitle;
  const displayDescription = description || config.defaultDescription;

  useEffect(() => {
    const currentFiles = getValues(name);
    const getData = async () => {
      if (Array.isArray(currentFiles)) {
        const newPreviews = currentFiles.map((file) =>
          typeof file === "string" ? file : URL.createObjectURL(file),
        );
        setPreviews(newPreviews);
      } else if (currentFiles) {
        if (typeof currentFiles === "string") {
          setPreview(currentFiles);
        } else {
          setPreview(URL.createObjectURL(currentFiles));
        }
      }
    };
    getData();
  }, [getValues, name]);

  useEffect(() => {
    if (!preview && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files).filter(config.mimeCheck);
      const existingFiles = getValues(name) || [];

      if (
        multiple === false ||
        typeof existingFiles === "string" ||
        (existingFiles &&
          typeof existingFiles === "object" &&
          "name" in existingFiles &&
          "size" in existingFiles &&
          "type" in existingFiles &&
          "lastModified" in existingFiles)
      ) {
        if (config.mimeCheck(files[0])) {
          setValue(name, files[0], { shouldValidate: true });
          setPreview(URL.createObjectURL(files[0]));
          setShowUploadBox(false);
        }
      } else {
        setValue(name, [...existingFiles, ...fileArray], {
          shouldValidate: true,
        });
        const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
        setPreviews((prev: any) => [...prev, ...newPreviews]);
        if (previews.length + newPreviews.length >= maxFiles) {
          setIsError(true);
        }
        setShowUploadBox(false);
      }
    }
  };

  useEffect(() => {
    if (previews.length > maxFiles) setIsError(true);
  }, [previews, maxFiles]);

  const removeFile = (index: number) => {
    const updatedPreviews = [...previews];
    const currentFiles = getValues(name);
    if (typeof currentFiles[index] === "string") {
      setRemovedImages([
        currentFiles[index]?.split("/product/")[1],
        ...removedImages,
      ]);
    }
    updatedPreviews.splice(index, 1);
    currentFiles?.length > 0 && currentFiles.splice(index, 1);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (updatedPreviews.length <= maxFiles) {
      setIsError(false);
    }
    setPreviews(updatedPreviews);
    setValue(name, currentFiles, { shouldValidate: true });
    setShowUploadBox(true);
  };

  const renderPreview = () => {
    if (fileType === "image" && preview) {
      return (
        <div className="relative mr-2 inline-block h-20 w-20">
          <Image
            src={preview}
            width={100}
            height={100}
            alt="Preview"
            className="h-full w-full rounded-md border object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreview(undefined);
              setValue(name, null, { shouldValidate: true });
              setShowUploadBox(true);
            }}
            className="absolute right-0 top-0 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red"
            style={{ transform: "translate(25%, -25%)" }}
          >
            <X style={{ color: "white", width: "15px" }} />
          </button>
        </div>
      );
    }

    if (fileType === "audio" && preview) {
      return (
        <div className="relative mr-2 inline-block rounded-md border bg-gray-50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <FileAudio className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-gray-700">
              Audio File
            </span>
          </div>
          <audio controls className="w-64">
            <source src={preview} />
            Your browser does not support the audio element.
          </audio>
          <button
            type="button"
            onClick={() => {
              setPreview(undefined);
              setValue(name, null, { shouldValidate: true });
              setShowUploadBox(true);
            }}
            className="absolute right-1 top-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red"
          >
            <X style={{ color: "white", width: "12px" }} />
          </button>
        </div>
      );
    }

    if (fileType === "pdf" && preview) {
      return (
        <div className="relative w-full rounded-md border bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 flex-shrink-0 text-red-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  PDF File
                </span>
                <a
                  href={preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View PDF
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setPreview(undefined);
                setValue(name, null, { shouldValidate: true });
                setShowUploadBox(true);
              }}
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <X style={{ color: "white", width: "14px" }} />
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderMultiplePreviews = () => {
    return previews.map((previewUrl: any, index: number) => {
      if (fileType === "image") {
        return (
          <div key={index} className="relative mr-2 inline-block h-20 w-20">
            <img
              src={previewUrl}
              width={100}
              height={100}
              alt="Preview"
              className="h-full w-full rounded-md border object-cover"
            />
            {cancle && (
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-base text-white shadow-md"
              >
                ×
              </button>
            )}
          </div>
        );
      }

      if (fileType === "audio") {
        return (
          <div
            key={index}
            className="relative mb-2 mr-2 inline-block rounded-md border bg-gray-50 p-3"
          >
            <div className="mb-2 flex items-center gap-2">
              <FileAudio className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-gray-700">
                Audio {index + 1}
              </span>
            </div>
            <audio controls className="w-48">
              <source src={previewUrl} />
              Your browser does not support the audio element.
            </audio>
            {cancle && (
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-1 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-md"
              >
                ×
              </button>
            )}
          </div>
        );
      }

      if (fileType === "pdf") {
        return (
          <div
            key={index}
            className="mb-2 w-full rounded-md border bg-gray-50 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 flex-shrink-0 text-red-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">
                    PDF {index + 1}
                  </span>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View PDF
                  </a>
                </div>
              </div>
              {cancle && (
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-sm text-white shadow-md hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div>
      <div className="space-y-4">
        {show && showUploadBox && (
          <div className="flex flex-col">
            {label && (
              <label className="mb-1 text-body-sm font-medium text-dark">
                {label}
              </label>
            )}
            <div className="relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <config.icon className="h-8 w-8 text-gray-400" />
                <p className="text-gray-600">
                  <span className="font-semibold text-primary">
                    {displayTitle}
                  </span>
                  <br />
                  {displayDescription}
                </p>
              </div>
              <input
                type="file"
                accept={config.accept}
                // accept="audio/*"
                multiple={multiple}
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
                ref={inputRef}
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Render multiple previews for multiple files */}
        {multiple && previews.length > 0 && (
          <div className="flex flex-wrap gap-2">{renderMultiplePreviews()}</div>
        )}

        {/* Render single preview for single file */}
        {!multiple && renderPreview()}
      </div>

      {(error || isError) && (
        <div className="mt-1 text-sm text-red-500">
          {error ??
            `Please limit your uploads to a maximum of ${maxFiles} ${fileType}s.`}
        </div>
      )}
    </div>
  );
};

export default UploadZone;
