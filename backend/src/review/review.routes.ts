import express from 'express';
const router = express.Router();
import { saveReview, fetchReviewHistory,updateReview } from './review.controller';


router.post("/sendReview", saveReview);
router.post("/fetchReviewHistory", fetchReviewHistory);
router.post("/updateReview", updateReview);

export const reviewRoutes = router;

