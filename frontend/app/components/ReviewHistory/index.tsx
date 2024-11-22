/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import useStore from "@/app/store";
import { HandThumbUpIcon } from "@heroicons/react/16/solid";
import { ReviewData } from "@/app/store/interfaces";
import ReviewForm from "../ReviewForm";
import { sortOptions } from "./interfaces";
import { useEffect, useState } from "react";
const ReviewHistory = () => {
  const reviewHistory = useStore((state) => state.destinationData!.reviewHistory);
  const [sortedReviewsHistory, setsortedReviewsHistory] = useState(reviewHistory); // Local state for sorted reviews

  const { updateReview,  } = useStore.getState()

  useEffect(() => {
    if (reviewHistory) {
      setsortedReviewsHistory(reviewHistory); // Initialize with the latest reviewHistory
    }
  }, [reviewHistory]);

  const handleLike = (reviewData: ReviewData) => {
    reviewData.likes! ++;
    updateReview(reviewData);
  }
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;

    if (!reviewHistory) return;

    let newSortedReviews = [...reviewHistory!]; // Create a copy of the original reviewHistory

    // Sort the copied array based on the selected option
    if (selectedSort === "likes") {
      newSortedReviews.sort((a, b) => b.likes - a!.likes); // Sort by likes (descending)
    } else if (selectedSort === "time") {
      newSortedReviews.sort((a, b) => 
        (Date.parse(b.createdAt || "") || 0) - (Date.parse(a.createdAt || "") || 0)
      );
    } else {
      // Default sorting (use the original order)
      newSortedReviews = [...reviewHistory];
    }

    // Update the sorted reviews locally without changing the original data in the store
    setsortedReviewsHistory(newSortedReviews);
  };
  return (
    <div className="space-y-6">
      {sortedReviewsHistory.length > 0 ? (

        <div>
          <h2 className="text-2xl font-semibold">{sortedReviewsHistory.length} Reviews</h2>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="bg-white border border-gray-300 text-gray-700 rounded-md p-2"
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {sortedReviewsHistory.map((reviewData, index) => (
            <div key={index} className="review-item bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow m-4">
              <h3 className="text-lg font-medium text-blue-600" >{reviewData.createdAt}</h3>
              <h3 className="text-lg font-medium text-blue-600" >Review:</h3>
              <p className="text-gray-600">{reviewData.review}</p>

              <h3 className="text-lg font-medium text-blue-600 mt-2">Address Clue Descriptions</h3>
              <div className="clue-descriptions ">
                {Object.entries(reviewData.clueDescriptions).map(([clue, description]) => (
                  <div key={clue} className="clue-description flex items-center space-x-2">
                    <p className="font-semibold text-sm ">{clue}:</p>
                    <p className="text-sm text-gray-700">{description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleLike(reviewData)}
                className="flex items-center mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                <HandThumbUpIcon className="h-5 w-5 mr-2" />
                {reviewData.likes}
              </button>
            </div>
          ))}
          <ReviewForm></ReviewForm>
        </div>

      ) : (
        <p>No reviews available</p>
      )}

    </div>
  )
};

export default ReviewHistory;
