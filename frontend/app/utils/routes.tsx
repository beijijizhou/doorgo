// Define base API URL

const BASE_URL =
  process.env.NEXT_PUBLIC_URL || 'http://localhost:8000';

console.log(`Using BASE_URL: ${BASE_URL}`);

// Define routes for 'review' resources
const reviewRoutes = {
  SEND_REVIEW: 'sendReview',
  FETCH_REVIEW_HISTORY: 'fetchReviewHistory',
  UPDATE_REVIEW: 'updateReview',
} as const; // 'as const' makes the keys and values literal types

// Utility function to build routes
const createRoute = (base: string, endpoint: string) => `${base}/review/${endpoint}`;

// Define apiRoutes dynamically using `Object.entries()`
export const apiRoutes = Object.fromEntries(
  
  Object.entries(reviewRoutes).map(([key, endpoint]) => [
    key,
    createRoute(BASE_URL, endpoint)
  ])
) as { [key in keyof typeof reviewRoutes]: string };
