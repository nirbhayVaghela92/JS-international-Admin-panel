"use client";
import { routes } from "@/constants/routes";
import { capitalizeWords } from "@/utils/helpers/commonHelpers";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import TooltipWrapper from "./TooltipWrapper";
import Image from "next/image";

function UserDetailsBox({ userDetails }: { userDetails: any }) {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center gap-1"
      onClick={() =>
       routes.users.view(userDetails.id)
      }
    >
      <TooltipWrapper content="View Profile">
        <Image
          width={40}
          height={40}
          loading="lazy"
          src={userDetails?.profile_image ?? userDetails?.user_profile_pic}
          alt="user"
          className="aspect-square h-10 w-10 rounded-full border object-cover"
        />
      </TooltipWrapper>
      <div>
        <p className="text-base font-semibold text-gray-900">
          {capitalizeWords(
            userDetails?.full_name ?? userDetails?.business_name,
          )}
        </p>
        {userDetails?.location && (
          <div className="flex items-center gap-1">
            <MapPin className="my-auto h-5 min-h-5 w-5 min-w-5 text-gray-500" />
            <TooltipWrapper
              content={userDetails?.location ?? userDetails?.location ?? ""}
            >
              <p className="max-w-full cursor-pointer truncate text-xs text-gray-500">
                {userDetails?.location ?? userDetails?.location}
              </p>
            </TooltipWrapper>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetailsBox;
