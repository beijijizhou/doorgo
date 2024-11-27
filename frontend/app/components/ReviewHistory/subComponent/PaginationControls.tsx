import React from 'react';
import useStore from "@/app/store";
import { RightArrowIcon,LeftArrowIcon } from './ArrowIcon';
export default function PaginationControls() {
    const sortedReviewsHistory = useStore((state) => state.sortedReviewsHistory);
    const currentIndex = useStore((state) => state.currentIndex);
    const setCurrentIndex = useStore((state) => state.setCurrentIndex);
    // const currentReviewPage = sortedReviewsHistory.slice(currentIndex - 1, currentIndex);
    const { reviewsPerPage } = useStore.getState();
    const totalPages = Math.ceil(sortedReviewsHistory.length / reviewsPerPage);

    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];

        if (currentIndex <= 2) {
            // Case 1: At the start
            pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
        } else if (currentIndex >= totalPages - 2) {
            // Case 2: At the end
            pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
            // Case 3: In the middle
            pages.push(
                1,
                '...',
                currentIndex,
                currentIndex + 1,
                '...',
                totalPages
            );
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
                className={`px-3 py-1 border rounded-md bg-gray-200 
        ${currentIndex === 1 ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'} 
        disabled:opacity-50`}
                onClick={() => setCurrentIndex(currentIndex - 1)} // Adjusts the currentIndex in the store
                disabled={currentIndex === 1}
            >
                <LeftArrowIcon></LeftArrowIcon>
            </button>
            

            <div className="pagination-controls flex gap-2">
                {pageNumbers.map((page, index) => {
                    const isActive = page === currentIndex;
                    const isEllipsis = page == "...";
                    // console.log(page, isEllipsis)
                    return (
                        <button
                            key={index}
                            className={`px-3 py-1 border rounded-md 
${isActive ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'}
${isEllipsis ? 'cursor-default text-gray-500 bg-transparent border-none hover:bg-transparent hover:text-gray-500' : ''}
        `}
                            onClick={() => typeof page === 'number' && handlePageChange(page)}
                            disabled={page === '...'}
                        >
                            {page}
                        </button>
                    );
                })}

            </div>

            <button
                className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-blue-500 hover:text-white disabled:opacity-50"
                onClick={() => setCurrentIndex(currentIndex + 1)} // Adjusts the currentIndex in the store
                disabled={currentIndex === totalPages}
            >
                <RightArrowIcon></RightArrowIcon>
            </button>
        </div>
    );
}
