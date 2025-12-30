import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ActionIconsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onAddAchievement?: () => void;
  onVerifyBusiness?: () => void;
  onRewardLogs?: () => void;
  onDelete?: () => void;
  userId?: string;
  email?: string;
};

export default function UserActionDropdown({
  onView,
  onEdit,
  onDelete,
  onAddAchievement,
  onVerifyBusiness,
  onRewardLogs,
}: ActionIconsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: () => void) => {
    // Close dropdown first
    setIsOpen(false);

    // Add small delay to ensure dropdown is fully closed
    setTimeout(() => {
      action();
    }, 100);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5 cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {onView && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleAction(onView)}
          >
            View
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleAction(onEdit)}
          >
            Edit
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleAction(onDelete)}
          >
            Delete
          </DropdownMenuItem>
        )}
        {onAddAchievement && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleAction(onAddAchievement)}
          >
            Achievements
          </DropdownMenuItem>
        )}
        {onVerifyBusiness && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleAction(onVerifyBusiness)}
          >
            Verify Business
          </DropdownMenuItem>
        )}
        {onRewardLogs && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleAction(onRewardLogs)}
          >
            Reward Logs
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
