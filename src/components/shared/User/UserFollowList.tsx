"use client";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/components/custom-elements/Loader";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ParmasType } from "@/utils/types";
import { capitalizeWords } from "@/utils/helpers/commonHelpers";

interface UserFollowListProps {
  userId: number;
  type: "followers" | "following";
  //   useGetUserFollowerList?: any;
  //   useGetUserFollowingList?: any;
  hook: any;
}

interface FollowUser {
  id: number;
  profile_image: string;
  full_name: string;
  username: string;
  email: string;
  location: string;
}

export default function UserFollowList({
  userId,
  type,
  //   useGetUserFollowerList,
  //   useGetUserFollowingList,
  hook,
}: UserFollowListProps) {
  const [params, setParams] = useState<ParmasType>({
    search: "",
    page: 1,
    limit: 12,
  });

  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

  //   const hookToUse =
  //     type === "followers" ? useGetUserFollowerList : useGetUserFollowingList;

  const { data, isFetchingNextPage, isLoading, handleScroll } =
    useInfiniteScroll({
      containerRef,
      params: { ...params, id: userId },
      fn: hook,
    });

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollHandler = () => handleScroll();
      container.addEventListener("scroll", scrollHandler);
      return () => {
        container.removeEventListener("scroll", scrollHandler);
      };
    }
  }, [handleScroll]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && data?.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-gray-500">
          No {type === "followers" ? "followers" : "following"} found
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="max-h-96 overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="space-y-3">
        {data?.map((user: FollowUser) => (
          <div
            key={user.id}
            className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
          >
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage
                src={user.profile_image}
                alt={user.full_name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {capitalizeWords(user.full_name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <h4 className="truncate font-semibold text-gray-900">
                {user.full_name}
              </h4>
              {user.username && (
                <p className="truncate text-sm text-gray-500">
                  {/* @{user.username} */}
                  <span className="font-bold">Username:{" "}</span>@{user.username}
                </p>
              )}
            </div>

            {/* Optional: Add follow/unfollow button here if needed */}
            {/* <div className="flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
            </div> */}
          </div>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <p className="text-sm text-gray-500">
            Loading more {type === "followers" ? "followers" : "following"}...
          </p>
        </div>
      )}
    </div>
  );
}
