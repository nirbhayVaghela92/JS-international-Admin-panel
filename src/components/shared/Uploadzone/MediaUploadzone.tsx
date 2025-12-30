"use client";
import { X, FileAudio, Image as ImageIcon, Video, ImagePlay, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FileType } from "@/utils/types";
import { getFileType } from "@/utils/helpers/commonHelpers";

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
    thumbnailFieldName?: string; // Field name for thumbnail when uploading video
    editMediaType?: 'image' | 'video'; // For edit mode to know what type of media to show
}

const MediaUploadzone: React.FC<UploadZoneProps> = ({
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
    fileType = 'image',
    maxFiles = 6,
    isStaticPreview = false,
    thumbnailFieldName = 'thumbnail',
    editMediaType
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentFileType, setCurrentFileType] = useState<FileType>(fileType);
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
        video: {
            accept: "video/*",
            mimeCheck: (file: File) => file.type.startsWith("video/"),
            defaultTitle: "Click to upload video",
            defaultDescription: "Drag and drop video here",
            icon: Video,
            previewType: "video",
        },
        audio: {
            accept: "audio/*",
            mimeCheck: (file: File) => file.type.startsWith("audio/"),
            defaultTitle: "Click to upload audio",
            defaultDescription: "Drag and drop audio file here",
            icon: FileAudio,
            previewType: "audio",
        },
        media: {
            accept: "image/*,video/*",
            mimeCheck: (file: File) =>
                file.type.startsWith("image/") || file.type.startsWith("video/"),
            defaultTitle: "Click to upload image or video",
            defaultDescription: "Drag and drop image or video here",
            icon: ImagePlay,
            previewType: "media",
        },
    };

    const config = fileTypeConfig[fileType];
    const displayTitle = title || config.defaultTitle;
    const displayDescription = description || config.defaultDescription;

    // Generate thumbnail from video
    const generateVideoThumbnail = (videoFile: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            video.onloadedmetadata = () => {
                // Set canvas dimensions
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Seek to 1 second or 10% of video duration, whichever is smaller
                const seekTime = Math.min(1, video.duration * 0.1);
                video.currentTime = seekTime;
            };

            video.onseeked = () => {
                if (ctx) {
                    // Draw the video frame to canvas
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Convert canvas to blob and then to base64
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                resolve(reader.result as string);
                            };
                            reader.readAsDataURL(blob);
                        } else {
                            reject(new Error('Failed to create thumbnail'));
                        }
                    }, 'image/jpeg', 0.8);
                }
            };

            video.onerror = () => {
                reject(new Error('Error loading video'));
            };

            // Create object URL and set as video source
            const videoUrl = URL.createObjectURL(videoFile);
            video.src = videoUrl;
            video.load();
        });
    };

    useEffect(() => {
        const currentFiles = getValues(name);
        const getData = async () => {
            if (Array.isArray(currentFiles)) {
                const newPreviews = await Promise.all(
                    currentFiles.map(async (file) => {
                        if (typeof file === "string") {
                            return {
                                url: file,
                                type: editMediaType || getFileType(file), // Use editMediaType for edit mode
                                isString: true
                            };
                        } else {
                            const detectedType = getFileType(file.type);
                            setCurrentFileType(detectedType);

                            if (detectedType === 'video') {
                                try {
                                    const thumbnail = await generateVideoThumbnail(file);
                                    return {
                                        url: URL.createObjectURL(file),
                                        thumbnail,
                                        type: 'video',
                                        isString: false
                                    };
                                } catch (error) {
                                    console.error('Error generating thumbnail:', error);
                                    return {
                                        url: URL.createObjectURL(file),
                                        type: 'video',
                                        isString: false
                                    };
                                }
                            }

                            return {
                                url: URL.createObjectURL(file),
                                type: detectedType,
                                isString: false
                            };
                        }
                    })
                );
                setPreviews(newPreviews);
            } else if (currentFiles) {
                if (typeof currentFiles === "string") {
                    setPreview(currentFiles);
                    setCurrentFileType(editMediaType || getFileType(currentFiles));
                } else {
                    const detectedType = getFileType(currentFiles.type);
                    setCurrentFileType(detectedType);

                    if (detectedType === 'video') {
                        try {
                            const thumbnail = await generateVideoThumbnail(currentFiles);
                            setPreview(URL.createObjectURL(currentFiles));
                            // Set thumbnail in form if it's a new video upload
                            if (thumbnailFieldName) {
                                setValue(thumbnailFieldName, thumbnail);
                            }
                        } catch (error) {
                            console.error('Error generating thumbnail:', error);
                            setPreview(URL.createObjectURL(currentFiles));
                        }
                    } else {
                        setPreview(URL.createObjectURL(currentFiles));
                    }
                }
            }
        };
        getData();
    }, [getValues, name, editMediaType, setValue, thumbnailFieldName]);

    useEffect(() => {
        if (!preview && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [preview]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    const file = files[0];
                    const detectedType = getFileType(file.type);
                    setValue(name, file);
                    setCurrentFileType(detectedType);

                    if (detectedType === 'video') {
                        try {
                            const thumbnail = await generateVideoThumbnail(file);
                            setPreview(URL.createObjectURL(file));
                            // Set thumbnail in form
                            if (thumbnailFieldName) {
                                setValue(thumbnailFieldName, thumbnail);
                            }
                        } catch (error) {
                            console.error('Error generating thumbnail:', error);
                            setPreview(URL.createObjectURL(file));
                        }
                    } else {
                        setPreview(URL.createObjectURL(file));
                    }

                    setShowUploadBox(false);
                }
            } else {
                // Handle multiple files
                const processedFiles = await Promise.all(
                    fileArray.map(async (file) => {
                        const detectedType = getFileType(file.type);

                        if (detectedType === 'video') {
                            try {
                                const thumbnail = await generateVideoThumbnail(file);
                                return {
                                    file,
                                    preview: {
                                        url: URL.createObjectURL(file),
                                        thumbnail,
                                        type: 'video',
                                        isString: false
                                    }
                                };
                            } catch (error) {
                                console.error('Error generating thumbnail:', error);
                                return {
                                    file,
                                    preview: {
                                        url: URL.createObjectURL(file),
                                        type: 'video',
                                        isString: false
                                    }
                                };
                            }
                        }

                        return {
                            file,
                            preview: {
                                url: URL.createObjectURL(file),
                                type: detectedType,
                                isString: false
                            }
                        };
                    })
                );

                setValue(name, [...existingFiles, ...processedFiles.map(pf => pf.file)]);
                const newPreviews = processedFiles.map(pf => pf.preview);
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
        setValue(name, currentFiles);
        setShowUploadBox(true);
    };

    const renderVideoThumbnail = (thumbnailUrl: string, isEdit = false) => {
        return (
            <div className="relative w-20 h-20 inline-block mr-2">
                <img
                    src={thumbnailUrl}
                    width={100}
                    height={100}
                    alt="Video thumbnail"
                    className="w-full h-full rounded-md object-cover border"
                />
                {/* Video play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                    <Play className="w-6 h-6 text-white fill-white" />
                </div>
                {!isEdit && (
                    <button
                        type="button"
                        onClick={() => {
                            setPreview(undefined);
                            setValue(name, null);
                            // Clear thumbnail as well
                            if (thumbnailFieldName) {
                                setValue(thumbnailFieldName, null);
                            }
                            setShowUploadBox(true);
                        }}
                        className="absolute top-0 right-0 z-20 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                        style={{ transform: "translate(25%, -25%)" }}
                    >
                        <X style={{ color: "white", width: "15px" }} />
                    </button>
                )}
            </div>
        );
    };

    const renderPreview = () => {
        // For edit mode with video, show thumbnail
        if (editMediaType === 'video' && currentFileType == "video" && preview) {
            const thumbnailUrl = getValues(thumbnailFieldName) || preview;
            return renderVideoThumbnail(thumbnailUrl, true);
        }

        if (currentFileType === 'image' && preview) {
            return (
                <div className="relative w-20 h-20 inline-block mr-2">
                    <Image
                        src={preview}
                        width={100}
                        height={100}
                        alt="Preview"
                        className="w-full h-full rounded-md object-cover border"
                    />
                    {/* <button
                        type="button"
                        onClick={() => {
                            setPreview(undefined);
                            setValue(name, null);
                            setShowUploadBox(true);
                        }}
                        className="absolute top-0 right-0 z-20 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                        style={{ transform: "translate(25%, -25%)" }}
                    >
                        <X style={{ color: "white", width: "15px" }} />
                    </button> */}
                </div>
            );
        }

        if (currentFileType === 'video' && preview) {
            const thumbnailData = getValues(thumbnailFieldName);
            if (thumbnailData) {
                const thumbnailUrl = thumbnailData instanceof File ? URL.createObjectURL(thumbnailData) : thumbnailData;
                return renderVideoThumbnail(thumbnailUrl);
            }

            // Fallback: show video icon if no thumbnail
            return (
                <div className="relative w-20 h-20 inline-block mr-2 bg-gray-100 border rounded-md items-center justify-center">
                    <Video className="w-8 h-8 text-gray-400" />
                    {/* <button
                        type="button"
                        onClick={() => {
                            setPreview(undefined);
                            setValue(name, null);
                            if (thumbnailFieldName) {
                                setValue(thumbnailFieldName, null);
                            }
                            setShowUploadBox(true);
                        }}
                        className="absolute top-0 right-0 z-20 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                        style={{ transform: "translate(25%, -25%)" }}
                    >
                        <X style={{ color: "white", width: "15px" }} />
                    </button> */}
                </div>
            );
        }

        if (currentFileType === 'audio' && preview) {
            return (
                <div className="relative inline-block mr-2 p-3 border rounded-md bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                        <FileAudio className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Audio File</span>
                    </div>
                    <audio controls className="w-64">
                        <source src={preview} />
                        Your browser does not support the audio element.
                    </audio>
                    {/* <button
                        type="button"
                        onClick={() => {
                            setPreview(undefined);
                            setValue(name, null);
                            setShowUploadBox(true);
                        }}
                        className="absolute top-1 right-1 z-20 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
                    >
                        <X style={{ color: "white", width: "12px" }} />
                    </button> */}
                </div>
            );
        }

        return null;
    };

    const renderMultiplePreviews = () => {
        return previews.map((previewData: any, index: number) => {
            const isStringPreview = typeof previewData === 'string';
            const previewUrl = isStringPreview ? previewData : previewData.url;
            const previewType = isStringPreview
                ? (editMediaType || getFileType(previewUrl))
                : previewData.type;

            if (previewType === 'image') {
                return (
                    <div key={index} className="relative w-20 h-20 inline-block mr-2">
                        <img
                            src={previewUrl}
                            width={100}
                            height={100}
                            alt="Preview"
                            className="w-full h-full rounded-md object-cover border"
                        />
                        {/* {cancle && (
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-base shadow-md"
                            >
                                ×
                            </button>
                        )} */}
                    </div>
                );
            }

            if (previewType === 'video') {
                const thumbnailUrl = isStringPreview
                    ? getValues(thumbnailFieldName) || previewUrl
                    : previewData.thumbnail || previewUrl;

                return (
                    <div key={index} className="relative w-20 h-20 inline-block mr-2">
                        <img
                            src={thumbnailUrl}
                            width={100}
                            height={100}
                            alt="Video thumbnail"
                            className="w-full h-full rounded-md object-cover border"
                        />
                        {/* Video play icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                            <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                        {/* {cancle && (
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-base shadow-md"
                            >
                                ×
                            </button>
                        )} */}
                    </div>
                );
            }

            if (previewType === 'audio') {
                return (
                    <div key={index} className="relative inline-block mr-2 mb-2 p-3 border rounded-md bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                            <FileAudio className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-medium text-gray-700">Audio {index + 1}</span>
                        </div>
                        <audio controls className="w-48">
                            <source src={previewUrl} />
                            Your browser does not support the audio element.
                        </audio>
                        {/* {cancle && (
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md"
                            >
                                ×
                            </button>
                        )} */}
                    </div>
                );
            }

            return null;
        });
    };

    return (
        <div>
            <div className="space-y-4">
                {/* {showUploadBox && ( */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer relative">
                        <div className="flex flex-col items-center gap-2">
                            <config.icon className="w-8 h-8 text-gray-400" />
                            <p className="text-gray-600">
                                <span className="text-[#5750f1] font-semibold">{displayTitle}</span>
                                <br />
                                {displayDescription}
                            </p>
                        </div>
                        <input
                            type="file"
                            accept={config.accept}
                            multiple={multiple}
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            ref={inputRef}
                            disabled={disabled}
                        />
                    </div>
                {/* )} */}

                {/* Render multiple previews for multiple files */}
                {multiple && previews.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {renderMultiplePreviews()}
                    </div>
                )}

                {/* Render single preview for single file */}
                {!multiple && renderPreview()}
            </div>

            {(error || isError) && (
                <div className="text-red-500 text-sm mt-1">
                    {error ?? `Please limit your uploads to a maximum of ${maxFiles} ${fileType}s.`}
                </div>
            )}
        </div>
    );
};

export default MediaUploadzone;