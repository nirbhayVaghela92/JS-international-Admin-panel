import { CustomButton } from "@/components/custom-elements/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";

interface PauseResumeConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    currentStatus: "paused" | "active";
    itemTitle: string;
    isLoading?: boolean;
    dialogTitle: string;
}

const PauseResumeConfirmationDialog: React.FC<PauseResumeConfirmationDialogProps> = ({
    dialogTitle,
    isOpen,
    onClose,
    onConfirm,
    currentStatus,
    itemTitle,
    isLoading,
}) => {
    const actionLabel = currentStatus === "paused" ? "Resume" : "Pause";

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <h2 className="mb-4 text-lg font-bold text-gray-800">{dialogTitle}</h2>
                <p className="mb-6 text-gray-600">
                    Are you sure you want to{" "}
                    <span className="font-semibold lowercase">{actionLabel}</span> the{" "}
                    <span className="font-semibold">{itemTitle}</span>?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <CustomButton
                        loading={isLoading}
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-lg text-white transition ${actionLabel === "Resume"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-600 hover:bg-gray-700"
                            }`}
                    >
                        Confirm
                    </CustomButton>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PauseResumeConfirmationDialog;
