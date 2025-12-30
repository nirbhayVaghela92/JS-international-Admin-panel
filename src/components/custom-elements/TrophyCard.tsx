import { Plus, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { CustomButton } from "./button";
import BadgeContainer from "@/components/custom-elements/Badge";
import { capitalizeWords } from "@/utils/helpers/commonHelpers";

export const TrophyCard = ({
  badge,
  isCurrentBadge = false,
  onRemove,
  isRemoveIcon = true,
  onAdd,
}: any) => {
  return (
    <Card
      className={`relative w-full transition-all duration-200 hover:shadow-md ${isCurrentBadge
        ? "bg-yellow-50 ring-2 ring-yellow-500"
        : "hover:bg-gray-50"
        }`}
    >
      <CardContent className="relative flex flex-col items-center space-y-2 p-4">
        {isCurrentBadge && isRemoveIcon && onRemove && (
          <CustomButton
            className="absolute right-2 top-2 z-10 aspect-square h-6 w-6 rounded-full bg-red-500 p-0 !px-0 text-white hover:bg-red-600"
            onClick={() => onRemove(badge)}
          >
            <X className="h-3 w-3" />
          </CustomButton>
        )}

        {!isCurrentBadge && onAdd && (
          <CustomButton
            className="absolute right-2 top-2 z-10 aspect-square h-6 w-6 rounded-full bg-green-500 p-0 !px-0 text-white hover:bg-green-600"
            onClick={() => onAdd(badge)}
          >
            <Plus className="h-3 w-3" />
          </CustomButton>
        )}

        <BadgeContainer
          badgeImageUrl={badge?.cover_image || badge?.image}
          badgeName={badge.name}
          badgeStatus={badge.status}
        />

        <p
          className={`text-center text-sm font-medium leading-tight text-gray-900 ${badge?.name?.length > 20 ? "text-xs" : ""
            }`}
        >
          {capitalizeWords(badge?.name)}
        </p>
      </CardContent>
    </Card>
  );
};
