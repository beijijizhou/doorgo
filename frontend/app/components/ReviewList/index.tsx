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
    console.log(reviewList.length > 0)
    // Fetch reviews when component mounts
  }, [reviewList]);


  const handleLike = async () => {
    // await likeReview(place_id);
  }

  return (
    <div>
      <div>
        {reviewList.length > 0 && (
          <>
            <h2>Review</h2> {/* Display this only if there are reviews */}
            {reviewList.map((review, index) => (
              <div key={index} className="review-item">
                <h3>{review.clueDescriptions.clue1}</h3>
                <p>{review.review}</p>
                <p>Likes: {review.likes}</p>
                <button onClick={() => handleLike()}>Like</button>
              </div>
            ))}
          </>
        )}
      </div>

    </div>
  );
};

export default ReviewList;
