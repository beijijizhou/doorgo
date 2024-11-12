const url = `http://localhost:8000`;
const review_routes = `${url}/review/`
export const apiRoutes = {
    SEND_REVIEW: `${review_routes}sendReview`,
    FETCH_REVIEW_HISTORY: `${review_routes}fetchReviewHistory`,
    LIKE_REVIEW: `${review_routes}likeReview`,
}