import React from "react";
import { Eye, MapPin, Play, Trophy, Zap, Heart, Vote } from "lucide-react";
import { capitalizeWords, formatDate } from "@/utils/helpers/commonHelpers";
import { Points, PostStatus } from "@/components/custom-elements/userpost-elements";
import TooltipWrapper from "@/components/custom-elements/TooltipWrapper";
import { useRouter } from "next/navigation";
import UserDetailsBox from "@/components/custom-elements/UserDetailsBox";

type BlogCardProps = {
    userPost?: any;
    onViewClick?: () => void;
    onStatusChange?: (post: any) => void;
};

const UserContestPostCard: React.FC<BlogCardProps> = ({
    userPost,
    onViewClick,
    onStatusChange,
}) => {
    const router = useRouter();
    // Determine which thumbnail to show - prioritize image, fallback to video
    const thumbnail = userPost?.media_files[0]?.thumbnail;

    return (
        <div className="h-full w-full max-w-full overflow-hidden rounded-2xl border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl">
            {/* Media Thumbnail + Floating View Icon + Rank Badge */}
            <div className="group relative h-30 w-full overflow-hidden">
                {thumbnail ? (
                    <div className="relative h-full w-full">
                        <img
                            src={thumbnail}
                            alt="Post Media"
                            loading="lazy"
                            className="h-full w-full transform object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        {userPost?.media_files?.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                                <div className="rounded-full bg-white bg-opacity-80 p-3 backdrop-blur-sm">
                                    <Play className="h-6 w-6 text-gray-700" fill="currentColor" />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="relative h-full w-full bg-muted flex items-center justify-center">
                        <div className="text-muted-foreground text-sm">No media</div>
                    </div>
                )}

                {/* Rank Badge */}
                {userPost?.rank && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-indigo-100 px-2 text-primary py-1  shadow-lg">
                        <Trophy className="h-3 w-3" />
                        <span className="text-xs font-bold">#{userPost.rank}</span>
                    </div>
                )}

                <button
                    onClick={onViewClick}
                    className="absolute right-3 top-3 rounded-full bg-white bg-opacity-80 p-2 text-gray-700 backdrop-blur-sm transition hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white"
                    title="View Post"
                >
                    <Eye className="h-5 w-5" />
                </button>
            </div>

            {/* Content */}
            <div className="flex h-60 flex-col justify-between space-y-0 p-4">
                <div className="flex items-start justify-between">
                    <UserDetailsBox userDetails={userPost?.user}/>
                </div>

                {/* Contest Stats */}
                <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 p-2">
                    {/* Votes */}
                    <TooltipWrapper content="Total Votes">
                        <div className="flex items-center gap-1 text-red-500">
                            <Vote className="h-4 w-4" />
                            <span className="text-sm font-medium">{userPost?.votes || 0} votes</span>
                        </div>
                    </TooltipWrapper>

                    {/* Boost Amount */}
                    {/* <TooltipWrapper content="Total boosted amount">
                        <div className="flex items-center gap-1 text-blue-500">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm font-medium">${userPost.total_boost_amount || 0}</span>
                        </div>
                    </TooltipWrapper> */}
                </div>

                {/* Description */}
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {userPost?.contest_entry?.length > 50
                        ? userPost?.contest_entry?.slice(0, 50) + "..."
                        : userPost?.contest_entry}
                </p>

                {/* Footer - Date and Status */}
                <div className="mt-2 flex items-center justify-between gap-1">
                    {onStatusChange && (
                        <PostStatus
                            onClick={() => {
                                onStatusChange(userPost);
                            }}
                            className="cursor-pointer"
                            status={`${userPost.status === "active" ? "Active" : "Inactive"}`}
                        />
                    )}
                    {userPost?.created_at && (
                        <div className="flex gap-2 items-center">
                            <span className="text-xs italic text-muted-foreground">Created:</span>
                            <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                {formatDate(userPost?.created_at)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserContestPostCard;