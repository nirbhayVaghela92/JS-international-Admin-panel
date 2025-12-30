import { EditIcon, TrashIcon, EyeIcon } from "@/assets/icon/icons";
import { PostStatus } from "../../custom-elements/userpost-elements";
import BadgeContainer from "@/components/custom-elements/Badge";
import { Badge } from "@/utils/types";
import ActionButton from "@/components/custom-elements/ActionButton";
import UserTypeBadge from "@/components/custom-elements/UserTypeBadge";
import { cn } from "@/lib/utils";

interface BadgeCardProps {
  badge: Badge;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
}

export const BadgeCard = ({
  badge,
  onEdit,
  onDelete,
  onStatusChange,
  onView,
}: BadgeCardProps) => {
  const getBadgeTypeText = (type: string) => {
    switch (type) {
      case "points_based":
        return "Points-based Badge";
      case "custom":
        return "Custom Badge";
      case "contest_badge":
        return "Contest Badge";
      default:
        return "Badge";
    }
  };

  return (
    <div
      className={cn(
        "group rounded-2xl border border-gray-200 bg-white",
        "flex h-full flex-col p-6 shadow-sm transition-all duration-200",
        "hover:border-gray-300 hover:shadow-md",
      )}
    >
      <div className="flex flex-1 flex-col items-center text-center">
        {/* Badge Image */}
        <BadgeContainer
          badgeImageUrl={badge.cover_image}
          badgeName={badge.name}
          badgeStatus={badge.status}
          className="!mb-0"
        />

        {/* Badge Title + Type */}
        <div className="mb-5 mt-4 w-full">
          <h3
            className="line-clamp-2 px-3 text-lg font-semibold leading-tight text-gray-900"
            title={badge?.name}
          >
            {badge?.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {getBadgeTypeText(badge?.type)}
          </p>
        </div>

        {/* Business-only tag (only for points-based) */}
        <UserTypeBadge type={badge?.user_type} className="mb-4" />

        {/* Footer — Status + Actions */}
        <div className="mt-auto flex w-full items-center justify-between border-t border-gray-100 pt-3">
          {/* Status */}
          <PostStatus
            onClick={onStatusChange}
            className="cursor-pointer select-none"
            status={badge?.status === "active" ? "Active" : "Inactive"}
          />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ActionButton
              tooltipContent="View Details"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors hover:bg-indigo-100 hover:text-indigo-800"
              Icon={EyeIcon}
              onClick={onView}
            />

            <ActionButton
              tooltipContent="Edit Badge"
              className="group inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
              Icon={() => (
                <div className="transition-transform duration-150 group-hover:scale-110">
                  <EditIcon />
                </div>
              )}
              onClick={onEdit}
            />

            <ActionButton
              tooltipContent="Delete Badge"
              className="group inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors hover:bg-red-100 hover:text-red-800"
              Icon={() => (
                <div className="transition-transform duration-150 group-hover:scale-110">
                  <TrashIcon />
                </div>
              )}
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
