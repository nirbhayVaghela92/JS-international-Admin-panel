import { capitalizeWords } from "@/utils/helpers/commonHelpers";
import React from "react";
import TooltipWrapper from "./TooltipWrapper";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import Image from "next/image";

function UserDetailBoxWithEmail({ userDetails }: { userDetails: any }) {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center gap-2"
      onClick={() => router.push(routes.users.view(userDetails.id))}
    >
      <TooltipWrapper content="View User Detail">
        <Image
          width={48}
          height={48}
          loading="lazy"
          src={userDetails?.profile_image}
          alt={userDetails?.name}
          className="h-12 w-12 rounded-full border-2 border-white object-cover shadow"
        />
      </TooltipWrapper>
      <div className="min-w-0">
        <p
          className="max-w-[100px] truncate text-sm font-medium"
          title={userDetails?.name || userDetails?.full_name}
        >
           {capitalizeWords(userDetails?.name || userDetails?.full_name)}
        </p>
        <span
          className="block max-w-[200px] truncate text-xs text-gray-500"
          title={userDetails?.user_name}
        >
          {userDetails?.email}
        </span>
      </div>
    </div>
  );
}

export default UserDetailBoxWithEmail;
