"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import fallbackImage from "@/assets/images/fallbackImage.png";
import Image from "next/image";
import { Badge } from "@/utils/types";

interface ViewBadgeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    badge: Badge | null;
}

export function ViewBadgeDialog({
    isOpen,
    onClose,
    badge,
}: ViewBadgeDialogProps) {
    // Helper function to get badge type display info
    const getBadgeTypeInfo = (type: string) => {
        switch (type) {
            case 'points_based':
                return {
                    label: 'Points-based',
                    className: 'bg-green-50 text-green-700 border-green-200'
                };
            case 'custom':
                return {
                    label: 'Custom',
                    className: 'bg-purple-50 text-purple-700 border-purple-200'
                };
            case 'contest_badge':
                return {
                    label: 'Contest Badge',
                    className: 'bg-yellow-50 text-yellow-800 border-yellow-300'
                };
            default:
                return {
                    label: type || 'Unknown',
                    className: 'bg-gray-50 text-gray-700 border-gray-200'
                };
        }
    };

    // Helper function to format sub type
    const getSubTypeLabel = (subType: string) => {
        switch (subType) {
            case 'total_points':
                return 'Total Points';
            case 'stats_points':
                return 'Statistics Points';
            default:
                return subType?.replace('_', ' ')?.replace(/\b\w/g, l => l.toUpperCase()) || '';
        }
    };

    // Helper function to format category
    const getCategoryLabel = (category: string) => {
        return category?.replace('_', ' ')?.replace(/\b\w/g, l => l.toUpperCase()) || '';
    };

    const typeInfo = getBadgeTypeInfo(badge?.type!);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <span>View Badge Details</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${typeInfo.className}`}>
                            {typeInfo.label}
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Badge Image Section */}
                    <div className="flex flex-col items-center">
                        <p className="mb-3 font-medium text-foreground">Badge Image</p>
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
                            ${badge?.status === "active"
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                                : 'bg-gray-300'
                            }`}>
                            <Image
                                src={badge?.cover_image || fallbackImage}
                                alt={badge?.name || "Badge"}
                                width={60}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Badge Information Grid */}
                    <div className="grid gap-4 text-sm">
                        {/* Badge Name */}
                        <div>
                            <p className="mb-2 font-medium text-foreground">Badge Name</p>
                            <div className="rounded-lg border bg-muted/50 px-4 py-3">
                                {badge?.name || 'N/A'}
                            </div>
                        </div>

                        {/* Badge Type - Always show */}
                        <div>
                            <p className="mb-2 font-medium text-foreground">Type</p>
                            <div className="rounded-lg border bg-muted/50 px-4 py-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded-md border ${typeInfo.className}`}>
                                    {typeInfo.label}
                                </span>
                            </div>
                        </div>

                        {/* Sub Type - Show if type is points_based */}
                        {badge?.type === "points_based" && badge?.sub_type && (
                            <div>
                                <p className="mb-2 font-medium text-foreground">Sub Type</p>
                                <div className="rounded-lg border bg-muted/50 px-4 py-3">
                                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                                        {getSubTypeLabel(badge.sub_type)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Category - Show if sub_type is stats_points */}
                        {badge?.type === "points_based" && badge?.sub_type === "stats_points" && badge?.category && (
                            <div>
                                <p className="mb-2 font-medium text-foreground">Category</p>
                                <div className="rounded-lg border bg-muted/50 px-4 py-3">
                                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-orange-50 text-orange-700 border border-orange-200">
                                        {getCategoryLabel(badge.category)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Points - Show if type is points_based */}
                        {badge?.type === "points_based" && (
                            <div>
                                <p className="mb-2 font-medium text-foreground">Points Required</p>
                                <div className="rounded-lg border bg-muted/50 px-4 py-3">
                                    <span className="text-lg font-semibold text-green-600">
                                        {badge?.points || 0}
                                    </span>
                                    <span className="ml-1 text-sm text-muted-foreground">points</span>
                                </div>
                            </div>
                        )}

                        {/* Status */}
                        <div>
                            <p className="mb-2 font-medium text-foreground">Status</p>
                            <div className="rounded-lg border bg-muted/50 px-4 py-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded-md border ${badge?.status === "active"
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-gray-50 text-gray-700 border-gray-200'
                                    }`}>
                                    {badge?.status === "active" ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="mb-2 font-medium text-foreground">Description</p>
                            <div className="max-h-[20vh] overflow-y-auto whitespace-pre-wrap rounded-lg border bg-muted/50 px-4 py-3">
                                {badge?.description || 'No description provided'}
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={onClose} variant="outline" className="w-full sm:w-auto">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}