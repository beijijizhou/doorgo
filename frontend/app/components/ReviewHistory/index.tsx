/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect } from "react";
import useStore from "@/app/store";
import { HandThumbUpIcon } from "@heroicons/react/16/solid";
import { ReviewData } from "@/app/store/interfaces";
const ReviewHistory = () => {
  const reviewHistory = useStore((state) => state.destinationData!.reviewHistory); // Track reviewList with Zustand hook
  const { updateReview } = useStore.getState()
  useEffect(() => {
    console.log(reviewHistory.length > 0 && reviewHistory[0].likes)
  }, [reviewHistory]);


  const handleLike = (reviewData: ReviewData) => {
    reviewData.likes! ++;

    updateReview(reviewData);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      {reviewHistory.length > 0 ? (
        reviewHistory.map((review, index) => (
          <div key={index} className="review-item bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-medium">{review.clueDescriptions.clue1}</h3>
            <p className="text-gray-600">{review.review}</p>

            {/* Display clue descriptions */}
            <div className="clue-descriptions mt-4">
              {Object.entries(review.clueDescriptions).map(([clue, description]) => (
                <div key={clue} className="clue-description mb-2">
                  <p className="font-semibold text-sm text-blue-500">{clue}:</p>
                  <p className="text-sm text-gray-700">{description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleLike(review)}
              className="flex items-center mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <HandThumbUpIcon className="h-5 w-5 mr-2" />
              {review.likes}
            </button>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  )
};

export default ReviewHistory;
