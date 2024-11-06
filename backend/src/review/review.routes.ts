import express from 'express';
const router = express.Router();
import { saveReview, fetchAllReviews } from './review.controller';


router.post("/sendReview", saveReview);
router.post("/fetchReviews", fetchAllReviews);

export const reviewRoutes = router;

