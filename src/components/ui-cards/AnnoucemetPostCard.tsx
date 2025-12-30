import React from "react";
import { Play } from "lucide-react";
import { formatDate } from "@/utils/helpers/commonHelpers";
import Image from "next/image";
import { EyeIcon, EditIcon, TrashIcon } from "@/assets/icon/icons";
import ActionButton from "@/components/custom-elements/ActionButton";
import { PostStatus } from "@/components/custom-elements/userpost-elements";

type BlogCardProps = {
  post?: any;
  onViewClick?: () => void;
  onStatusChange?: (post: any) => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const AnnoucemetPostCard: React.FC<BlogCardProps> = ({
  post,
  onViewClick,
  onEditClick,
  onDeleteClick,
  onStatusChange,
}) => {
  const imageThumbnail = post?.media.filter(
    (itm: any) => itm.media_type === "image",
  );

  const videoThumbnail = post?.media.filter(
    (itm: any) => itm.media_type === "video",
  );

  // Determine which thumbnail to show - prioritize image, fallback to video
  const thumbnailToShow =
    imageThumbnail?.length > 0
      ? imageThumbnail[0]?.file_url
      : videoThumbnail?.[0]?.thumbnail_url;
  // const isVideoThumbnail = thumbnailToShow?.media_type === "video";

  return (
    <div className="mx-auto h-full w-full max-w-md overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
      {/* Media Thumbnail + Floating View Icon */}
      <div className="group relative h-56 w-full overflow-hidden">
        {thumbnailToShow ? (
          <div className="relative h-full w-full">
            <Image
              width={400}
              height={300}
              src={thumbnailToShow}
              alt="Post Media"
              loading="lazy"
              className="h-full w-full transform object-cover transition-all duration-500 group-hover:scale-110"
            />
            {imageThumbnail?.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="rounded-full bg-white bg-opacity-80 p-3 backdrop-blur-sm">
                  <Play className="h-7 w-7 text-gray-700" fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        ) : (
          // Fallback when no media is available
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <div className="text-center">
              <p className="text-base text-gray-500">No media available</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col justify-between p-4">
        <div className="max-h-[60px] min-h-[60px] overflow-hidden">
          <p className="line-clamp-3 text-base leading-relaxed text-gray-700">
            {post?.content && post.content.length > 80
              ? post.content.slice(0, 80) + "..."
              : post?.content}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-2 flex flex-grow flex-col justify-end space-y-4">
          {/* Status + Actions */}
          <div className="flex items-center justify-between">
            <PostStatus
              onClick={
                onStatusChange
                  ? () => onStatusChange(post)
                  : () => console.log("Status clicked")
              }
              className="cursor-pointer"
              status={post.status === "active" ? "Active" : "Inactive"}
            />

            <div className="flex space-x-2">
              <ActionButton
                tooltipContent="View Details"
                className="rounded-full bg-indigo-50 p-2 text-indigo-600 transition-colors hover:bg-indigo-100 hover:text-indigo-800"
                Icon={EyeIcon}
                onClick={onViewClick}
              />

              <ActionButton
                tooltipContent="Edit"
                className="rounded-full bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
                Icon={EditIcon}
                onClick={onEditClick}
              />

              <ActionButton
                tooltipContent="Delete"
                className="rounded-full bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 hover:text-red-800"
                Icon={TrashIcon}
                onClick={onDeleteClick}
              />
            </div>
          </div>

          {/* Created Date */}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm italic text-gray-400">Created on:</span>
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600">
                {post?.created_at ? formatDate(post?.created_at) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnoucemetPostCard;
