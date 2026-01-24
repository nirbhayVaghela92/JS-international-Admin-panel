import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CustomButton } from "@/components/custom-elements/button";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentStatus: string;
  itemTitle: string;
  dialogTitle: string;
  actionType?:
    | "approve"
    | "reject"
    | "suspend"
    | "unsuspend"
    | "activate"
    | "inactive"
    | "requested";
  isLoading?: boolean;
}

const StatusModal: React.FC<StatusModalProps> = ({
  dialogTitle,
  isOpen,
  onClose,
  onConfirm,
  currentStatus,
  itemTitle,
  isLoading,
}) => {
  const getStatusInfo = () => {
    if (currentStatus === "suspend") {
      return { label: "Unsuspended", positive: true };
    } else if (currentStatus === "unsuspend") {
      return { label: "Suspended", positive: false };
    } else if (
      currentStatus === "A" ||
      currentStatus === "active" ||
      currentStatus === "Active"
    ) {
      return { label: "Inactive", positive: false };
    } else if (
      currentStatus === "I" ||
      currentStatus === "inactive" ||
      currentStatus === "Inactive"
    ) {
      return { label: "Active", positive: true };
    } else if (currentStatus === "requested" || currentStatus === "rejected") {
      return { label: "Approved", positive: true };
    } else if (currentStatus === "approved") {
      return { label: "Rejected", positive: false };
    }

    return { label: "Updated", positive: true };
  };

  const { label: newStatus, positive: isPositiveAction } = getStatusInfo();

  // Define color schemes dynamically
  const statusColor = isPositiveAction ? "text-green-600" : "text-red-600";
  const buttonColor = isPositiveAction
    ? "bg-green-600 hover:bg-green-700"
    : "bg-red-600 hover:bg-red-700";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="mb-4 text-lg font-bold text-gray-800">
          {dialogTitle}
        </DialogTitle>
        <p className="mb-6 text-gray-600">
          Are you sure you want to mark this{" "}
          <span className="font-semibold">{itemTitle}</span> as{" "}
          <span className={`font-bold ${statusColor}`}>{newStatus}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <CustomButton
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
            label="Cancel"
            onClick={onClose}
          />
          <CustomButton
            loading={isLoading}
            className={`rounded-lg px-4 py-2 text-white transition ${buttonColor} disabled:cursor-not-allowed disabled:opacity-50`}
            label="Confirm"
            onClick={onConfirm}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
