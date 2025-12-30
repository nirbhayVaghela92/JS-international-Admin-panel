"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomButton } from "@/components/custom-elements/button";

interface RegionViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  region: any | null;
}

export default function RegionViewDialog({
  isOpen,
  onClose,
  region,
}: RegionViewDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Region Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-2 text-sm">
          {/* Region Name */}
          <div>
            <p className="mb-1 text-gray-500">Region Name</p>
            <p className="font-medium text-gray-900">{region?.name}</p>
          </div>

          {/* Radius */}
          <div>
            <p className="mb-1 text-gray-500">Radius</p>
            <p className="font-medium text-gray-900">{region?.radius} Mile</p>
          </div>

          {/* Anchor City */}
          <div>
            <p className="mb-1 text-gray-500">Anchor City</p>
            <p className="font-medium text-gray-900">{region?.anchor_city?.name}</p>
          </div>

          {/* Included Cities */}
          <div>
            <p className="mb-1 text-gray-500">Included Cities</p>
            <p className="font-medium text-gray-900">
              {region?.included_cities
                ?.map((city: any) => city.name)
                .join(", ")}
            </p>
          </div>

          {/* Thresholds */}
          <div>
            <p className="mb-1 text-gray-500">Threshold (Users)</p>
            <p className="font-medium text-gray-900">{region?.user_threshold}</p>
          </div>

          <div>
            <p className="mb-1 text-gray-500">Threshold (Business)</p>
            <p className="font-medium text-gray-900">{region?.business_threshold}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <CustomButton variant="outline" label="Close" onClick={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Helper Component */
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
