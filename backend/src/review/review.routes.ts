import express from 'express';
const router = express.Router();
import { saveReview, fetchAllReviews as fetchReviewHistory } from './review.controller';


router.post("/sendReview", saveReview);
router.post("/fetchReviewHistory", fetchReviewHistory);

export const reviewRoutes = router;

