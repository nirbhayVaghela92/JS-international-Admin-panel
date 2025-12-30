import { FiltersTypes } from "@/utils/types";
import React from "react";

interface PostPaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<FiltersTypes |FiltersTypes>>;
  totalPages: number;
  maxVisiblePages?: number; // New prop to control visible page buttons
}

export const PostPagination: React.FC<PostPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  maxVisiblePages = 5, // Default to showing 5 page buttons
}) => {
  // Calculate the range of pages to display
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {/* First Page Button */}
      <button
        onClick={() => setCurrentPage((prev) => ({ ...prev, page: 1 }))}
        disabled={currentPage === 1}
        className="rounded-md bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
      >
        « First
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() =>
          setCurrentPage((prev) => ({
            ...prev,
            page: Math.max(prev.page - 1, 1),
          }))
        }
        disabled={currentPage === 1}
        className="rounded-md bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
      >
        ‹ Previous
      </button>

      {/* Show ellipsis if needed at start */}
      {visiblePages[0] > 1 && <span className="px-4 py-2">...</span>}

      {/* Visible Page Buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage((prev) => ({ ...prev, page }))}
          className={`rounded-md px-4 py-2 ${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          } transition`}
        >
          {page}
        </button>
      ))}

      {/* Show ellipsis if needed at end */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <span className="px-4 py-2">...</span>
      )}

      {/* Next Page Button */}
      <button
        onClick={() =>
          setCurrentPage((prev) => ({
            ...prev,
            page: Math.min(prev.page + 1, totalPages),
          }))
        }
        disabled={currentPage === totalPages}
        className="rounded-md bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
      >
        Next ›
      </button>

      {/* Last Page Button */}
      <button
        onClick={() =>
          setCurrentPage((prev) => ({ ...prev, page: totalPages }))
        }
        disabled={currentPage === totalPages}
        className="rounded-md bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
      >
        Last »
      </button>

      {/* Optional: Page Info */}
      <div className="ml-4 flex items-center">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};
