import React from 'react';
import useStore from "@/app/store";

export default function PaginationControls() {
    const sortedReviewsHistory = useStore((state) => state.sortedReviewsHistory);
    const currentIndex = useStore((state) => state.currentIndex);
    const setCurrentIndex = useStore((state) => state.setCurrentIndex);
    // const currentReviewPage = sortedReviewsHistory.slice(currentIndex - 1, currentIndex);
    const { reviewsPerPage } = useStore.getState();
    const totalPages = Math.ceil(sortedReviewsHistory.length / reviewsPerPage);

    const generatePageNumbers = () => {
        const pages = [];
        const visibleRange = 3; // Number of pages to show before/after the current index

        // Show first page
        if (currentIndex > visibleRange + 1) {
            pages.push(1, '...');
        }

        // Add pages around the current index
        for (
            let i = Math.max(1, currentIndex - visibleRange);
            i <= Math.min(totalPages, currentIndex + visibleRange);
            i++
        ) {
            pages.push(i);
        }

        // Show last page
        if (currentIndex < totalPages - visibleRange) {
            pages.push('...', totalPages);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (typeof page === 'number') {
            setCurrentIndex(page); // Update the index in the store
        }
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
            <button
                className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-blue-500 hover:text-white disabled:opacity-50"
                onClick={() => setCurrentIndex(currentIndex - 1)} // Adjusts the currentIndex in the store
                disabled={currentIndex === 1}
            >
                Previous
            </button>

            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 border rounded-md 
            ${page === currentIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'}
            ${page === '...' ? 'cursor-default' : ''}`}
                    onClick={() => handlePageChange(page as number)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}

            <button
                className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-blue-500 hover:text-white disabled:opacity-50"
                onClick={() => setCurrentIndex(currentIndex + 1)} // Adjusts the currentIndex in the store
                disabled={currentIndex === totalPages}
            >
                Next
            </button>
        </div>
    );
}
