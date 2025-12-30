import React from 'react'

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  maxVisiblePages?: number; // New prop to control visible page buttons
}

export const Paginationn: React.FC<PaginationProps> = ({ 
  currentPage, 
  setCurrentPage, 
  totalPages,
  maxVisiblePages = 5 // Default to showing 5 page buttons
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
    <div className="flex justify-center mt-8 gap-2 flex-wrap">
      {/* First Page Button */}
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
      >
        « First
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
      >
        ‹ Previous
      </button>

      {/* Show ellipsis if needed at start */}
      {visiblePages[0] > 1 && (
        <span className="px-4 py-2">...</span>
      )}

      {/* Visible Page Buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-md ${
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
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Next ›
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Last »
      </button>

      {/* Optional: Page Info */}
      <div className="flex items-center ml-4">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};