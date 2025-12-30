import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface ReportPostStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  actionType: "block" | "solve";
  disabled?: boolean;
}

export const ReportPostStatusDialog: React.FC<ReportPostStatusDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  actionType,
  disabled = false,
}) => {
  const [reason, setReason] = useState("");

  const config = {
    block: {
      title: "Block Post",
      placeholder: "Why are you blocking this post?...",
      confirmText: "Confirm",
      confirmClass: "bg-red-600 hover:bg-red-700",
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-5 w-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 015.636 5.636"
            />
          </svg>
        </div>
      ),
    },
    solve: {
      title: "Mark as Solved",
      placeholder: "Why are you marking this as solved?...",
      confirmText: "Confirm",
      confirmClass: "bg-green-600 hover:bg-green-700",
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-5 w-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      ),
    },
  };

  const currentConfig = config[actionType];

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  const handleClose = () => {
    onClose();
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="mb-4 flex items-center gap-3">
          {currentConfig.icon}
          <h2 className="text-lg font-semibold text-gray-900">
            {currentConfig.title}
          </h2>
        </div>

        <div className="mb-6">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={currentConfig.placeholder}
            className="min-h-[100px] w-full resize-none rounded-lg border border-gray-300 p-3 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={disabled}
            onClick={handleConfirm}
            className={`rounded-lg px-4 py-2 text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${currentConfig.confirmClass}`}
          >
            {disabled ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              currentConfig.confirmText
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
