"use client";
import React from "react";
import { Eye, Play, Store } from "lucide-react";
import { formatDate } from "@/utils/helpers/commonHelpers";
import { Points, PostStatus } from "../../custom-elements/userpost-elements";
import Image from "next/image";
import logo from "@/assets/logos/big-logo.png";
import { useRouter } from "next/navigation";
import UserDetailsBox from "../../custom-elements/UserDetailsBox";
import ActionButton from "@/components/custom-elements/ActionButton";
import TooltipWrapper from "@/components/custom-elements/TooltipWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  userPost?: any;
  onViewClick?: () => void;
  onStatusChange?: (post: any) => void;
  postType?: number; // 6= Rewards post
};

const UserPostCard: React.FC<BlogCardProps> = ({
  userPost,
  onViewClick,
  onStatusChange,
  postType,
}) => {
  const router = useRouter();
  const imageThumbnail = userPost?.media.filter(
    (itm: any) => itm.media_type === "image",
  );

  const videoThumbnail = userPost?.media.filter(
    (itm: any) => itm.media_type === "video",
  );

  // Determine which thumbnail to show - prioritize image, fallback to video
  const thumbnailToShow =
    imageThumbnail?.length > 0
      ? imageThumbnail[0]?.file_url
      : videoThumbnail?.[0]?.thumbnail_url;
  // const isVideoThumbnail = thumbnailToShow?.media_type === "video";

  return (
    <Card className="overflow-hidden border bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
      {/* Media Section */}
      <div className="group relative h-48 overflow-hidden">
        {thumbnailToShow ? (
          <>
            <Image
              src={thumbnailToShow}
              alt="Post Media"
              width={300}
              height={200}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Video Play Overlay */}
            {imageThumbnail?.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
                  <Play
                    className="ml-1 h-6 w-6 text-gray-900"
                    fill="currentColor"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          /* Fallback Image */
          <div className="flex h-full items-center justify-center">
            <Image
              src={logo}
              alt="Fallback Media"
              width={280}
              height={200}
              className="object-contain"
            />
          </div>
        )}

        <Points
          points={userPost?.challenge_point}
          className="absolute left-3 top-3"
        />

        {/* View Action */}
        <ActionButton
          tooltipContent="View Post"
          Icon={Eye}
          onClick={onViewClick}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-700 shadow-md backdrop-blur-sm transition hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white"
        />
      </div>

      {/* Content */}
      <CardContent className="space-y-2.5 p-3">
        {/* User + Points */}
        <UserDetailsBox
          userDetails={userPost?.create_by ??  userPost?.user_details}
        />

        {/* Business */}
        {postType === 6 && (
          <div className="flex items-center gap-2 rounded-md bg-purple-50 px-2.5 py-1.5 dark:bg-purple-950/30">
            <Store className="h-3.5 w-3.5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase text-purple-600 dark:text-purple-400">
                Business
              </p>
              <TooltipWrapper content="View business Account" disable={userPost?.reward_adventure?.business?.id === undefined}>
                <p
                  className={cn(
                    "truncate text-xs font-semibold text-foreground w-fit",
                    userPost?.reward_adventure?.business?.id !== undefined
                      ? "cursor-pointer"
                      : "",
                  )}
                  title={userPost?.reward_adventure?.business?.business_name}
                  // onClick={() =>
                  //   router.push(
                  //     routes.business.view(
                  //       userPost?.reward_adventure?.business?.id,
                  //     ),
                  //   )
                  // } 
                >
                  {userPost?.reward_adventure?.business?.business_name || "N/A"}
                </p>
              </TooltipWrapper>
            </div>
          </div>
        )}

        {/* Rewards */}
        {postType === 6 && (
          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] font-medium uppercase text-muted-foreground">
              Rewards:
            </span>
            <TooltipWrapper content="View Reward">
              <span
                className="cursor-pointer truncate text-sm font-semibold text-blue-600 dark:text-blue-400"
                title={userPost?.reward_adventure?.adventure_title}
                // onClick={() => {
                //   router.push(
                //     routes.rewards.rewardAdventureView(
                //       userPost?.reward_adventure?.id,
                //     ),
                //   );
                // }}
              >
                {userPost?.reward_adventure?.adventure_title}
              </span>
            </TooltipWrapper>
          </div>
        )}

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-700">
          {userPost?.content?.length > 50
            ? `${userPost.content.slice(0, 50)}...`
            : userPost?.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-2 text-xs">
          {onStatusChange && (
            <PostStatus
              onClick={() => onStatusChange(userPost)}
              status={userPost?.status === "active" ? "Active" : "Inactive"}
              className="cursor-pointer"
            />
          )}

          {userPost?.created_at && (
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">Created on:</p>
              <p className="text-xs font-medium text-foreground">
                {formatDate(userPost.created_at)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPostCard;
