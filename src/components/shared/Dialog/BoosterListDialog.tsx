"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FiltersTypes } from "@/utils/types";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetNotificationList } from "@/hooks/queries/useNotification";
import { paginationDropdownOptions } from "@/utils/data/dropdowns";
import { capitalizeWords, formatDate } from "@/utils/helpers/commonHelpers";
import InputGroup from "@/components/custom-elements/InputGroup";
import CustomDropdown from "@/components/custom-elements/CustomDropdown";
import TablePagination from "@/components/shared/CustomPagination/TablePagination";


export const BoosterListData = {
    "data": [
        {
            "id": 122,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "umang patel",
                "email": "umang@yopmail.com"
            },
            "total_votes": 24,
            "donated_amount": 100,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 123,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "riya sharma",
                "email": "riya@yopmail.com"
            },
            "total_votes": 15,
            "donated_amount": 50,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 130,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "suresh kumar",
                "email": "suresh@yopmail.com"
            },
            "total_votes": 22,
            "donated_amount": 110,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 131,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "kavita rao",
                "email": "kavita@yopmail.com"
            },
            "total_votes": 28,
            "donated_amount": 130,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 132,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "manoj tiwari",
                "email": "manoj@yopmail.com"
            },
            "total_votes": 17,
            "donated_amount": 60,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 133,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "deepa nair",
                "email": "deepa@yopmail.com"
            },
            "total_votes": 39,
            "donated_amount": 170,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 134,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "rohit joshi",
                "email": "rohit@yopmail.com"
            },
            "total_votes": 25,
            "donated_amount": 140,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 144,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "rajesh pillai",
                "email": "rajesh@yopmail.com"
            },
            "total_votes": 16,
            "donated_amount": 70,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 145,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "divya saxena",
                "email": "divya@yopmail.com"
            },
            "total_votes": 40,
            "donated_amount": 195,
            "created_at": "2025-09-17T06:56:25.000Z",

        },
        {
            "id": 146,
            "user": {
                "profile_image": "https://api-uat.doyouzazu.com/uploads/user/1751542973767-6u5l.jpg",
                "name": "kiran thakur",
                "email": "kiran@yopmail.com"
            },
            "total_votes": 32,
            "donated_amount": 145,
            "created_at": "2025-09-17T06:56:25.000Z",
        }
    ],
    "pagination": {
        "total": 25,
        "page": 1,
        "limit": 25,
        "total_pages": 1
    }
}
interface BoosterListDialogPropType {
    isOpen: boolean;
    onClose: () => void;
    participate: any;
}

export function BoosterListDialog({
    isOpen,
    onClose,
    participate,
}: BoosterListDialogPropType) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<FiltersTypes>({
        page: 1,
        limit: 15,
        search: "",
        total_pages: 0,
        total_items: 0,
    });

    const { data, isLoading } = useGetNotificationList(filters);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);

        const performSearch = () => {
            setFilters((prev) => ({ ...prev, search: e.target.value }));
        };

        timeoutRef.current = setTimeout(performSearch, 500);
    };

    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            page: data?.pagination.page ?? prev.page,
            limit: data?.pagination.limit ?? prev.limit,
            total_pages: data?.pagination.total_pages ?? prev.total_pages,
            total_items: data?.pagination?.total ?? prev.total_items,
        }));
    }, [data, isLoading]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="w-[90%] max-w-4xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <DialogHeader>
                    <DialogTitle>Booster List</DialogTitle>
                </DialogHeader>

                {/* Scrollable Section */}
                <div className="flex-1 overflow-y-auto rounded-lg bg-white shadow-lg mt-3 flex flex-col">
                    {/* Search + Per Page */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="relative flex items-center gap-2">
                            <InputGroup
                                name="search"
                                icon={
                                    <X
                                        className="h-5 w-5 cursor-pointer rounded-full bg-gray-100 p-1 text-gray-500 shadow-sm transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setFilters((prev) => ({ ...prev, search: "" }));
                                        }}
                                    />
                                }
                                label=""
                                type="text"
                                placeholder="Search participate..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full py-2 pl-4"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="whitespace-nowrap text-sm text-gray-600">
                                Per Page:
                            </span>
                            <CustomDropdown
                                width="w-18"
                                options={paginationDropdownOptions}
                                onChange={(value: number | string) => {
                                    setFilters((prev) => ({
                                        ...prev,
                                        limit:
                                            typeof value === "number" ? value : parseInt(value, 10),
                                    }));
                                }}
                                value={filters.limit}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-y-auto px-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {["Booster", "Donated Amount", "Created At"].map((key) => (
                                        <TableHead key={key}>{key}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {BoosterListData?.data?.length > 0 ? (
                                    BoosterListData?.data?.map((user: any) => (
                                        <TableRow key={user?.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={user?.user?.profile_image}
                                                        alt={user?.user?.name}
                                                        className="h-12 w-12 rounded-full border-2 border-white object-cover shadow"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">
                                                            {capitalizeWords(user?.user?.name)}
                                                        </p>
                                                        <span>{user?.user?.email}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>${user?.donated_amount}</TableCell>
                                            <TableCell>{formatDate(user?.createdAt)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No Data Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {BoosterListData?.data.length > 0 && (
                        <div className="p-4 pt-0 border-t">
                            <TablePagination
                                currentPage={filters.page}
                                totalPages={filters.total_pages}
                                itemsPerPage={filters.limit}
                                totalItems={filters.total_items || 0}
                                onPageChange={(page: number) => {
                                    setFilters((prev) => ({
                                        ...prev,
                                        page: page,
                                    }));
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Footer (Always Visible) */}
                {/* <DialogFooter className="mt-4">
                    <Button onClick={onClose} variant="outline">
                        Close
                    </Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}
