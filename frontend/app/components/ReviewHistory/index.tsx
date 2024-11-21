/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import useStore from "@/app/store";
import { HandThumbUpIcon } from "@heroicons/react/16/solid";
import { ReviewData } from "@/app/store/interfaces";
import ReviewForm from "../ReviewForm";
import { sortOptions } from "./interfaces";
const ReviewHistory = () => {
  const reviewHistory = useStore((state) => state.destinationData!.reviewHistory); // Track reviewList with Zustand hook
  const { updateReview } = useStore.getState()



  const handleLike = (reviewData: ReviewData) => {
    reviewData.likes! ++;
    updateReview(reviewData);
  }
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    console.log("Selected Sort:", selectedSort);
    // Add your sorting logic here
  };
  return (
    <div className="space-y-6">
      {reviewHistory.length > 0 ? (

        <div>
          <h2 className="text-2xl font-semibold">{reviewHistory.length} Reviews</h2>

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


          {reviewHistory.map((reviewData, index) => (
            <div key={index} className="review-item bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow m-4">
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
