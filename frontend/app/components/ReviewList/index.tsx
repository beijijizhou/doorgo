/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState, useEffect } from "react";
import { likeReview } from "@/app/api/review/reviewAPI";
import useStore from "@/app/store";
const ReviewList = () => {
  const reviewList = useStore((state) => state.reviewList); // Track reviewList with Zustand hook

  useEffect(() => {
    // setReviewList(); 
    console.log(reviewList)
    
    // Fetch reviews when component mounts
  }, [reviewList]);


  const handleLike = async (place_id: string) => {
    // await likeReview(place_id);
  }

  return (
    <div>
      <div>
        {reviewList.length > 0 && (
          <>
            <h2>Review</h2> {/* Display this only if there are reviews */}
            {reviewList.map((review) => (
              <div key={review.location.place_id} className="review-item">
                <h3>{review.clueDescriptions.clue1}</h3>
                <p>{review.review}</p>
                <p>Likes: {review.likes}</p>
                <button onClick={() => handleLike(review.location.place_id!)}>Like</button>
              </div>
            ))}
          </>
        )}
      </div>

    </div>
  );
};

export default ReviewList;
