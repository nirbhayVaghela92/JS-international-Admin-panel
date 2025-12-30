"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileAudio } from "lucide-react";

interface ViewSubCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subCategory: any | null;
}

export function ViewSubCategoryDialog({
  isOpen,
  onClose,
  subCategory,
}: ViewSubCategoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-h-[85vh] overflow-y-auto border-none sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>View Category</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm text-muted-foreground">
          <div>
            <p className="mb-1 font-medium text-foreground">Category Name</p>
            <div className="rounded-md border bg-muted px-3 py-2">
              {subCategory?.title}
            </div>
          </div>

          <div>
            <p className="mb-1 font-medium text-foreground">Description</p>
            <div className="max-h-[25vh] overflow-scroll whitespace-pre-wrap rounded-md border bg-muted px-3 py-2">
              {subCategory?.description}
            </div>
          </div>

          <div>
            <p className="mb-1 font-medium text-foreground">Short description</p>
            <div className="max-h-[25vh] overflow-scroll whitespace-pre-wrap rounded-md border bg-muted px-3 py-2">
              {subCategory?.short_description ?? "N/A"}
            </div>
          </div>

          <div>
            <p className="mb-1 font-medium text-foreground">Category Points</p>
            <div className="rounded-md border bg-muted px-3 py-2">
              {subCategory?.points}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <p className="mb-1 font-medium text-foreground">Category Image</p>
              <img
                width={100}
                height={100}
                src={subCategory?.cover_image}
                alt="Category"
                className="mt-2 max-h-40 rounded-md border object-cover"
              />
            </div>
            {subCategory?.audio?.[0]?.file_url && <div className="col-span-2">
              <p className="mb-1 font-medium text-foreground">Audio File</p>
              <audio controls className="w-full mt-2">
                <source src={subCategory?.audio[0]?.file_url} />
                Your browser does not support the audio element.
              </audio>
            </div>}
          </div>

        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}