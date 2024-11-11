const url = `http://localhost:8000`;
const review_routes = `${url}/review/`
export const apiRoutes = {
    SEND_REVIEW: `${review_routes}sendReview`,
    FETCH_REVIEWS: `${review_routes}fetchReviews`,
    LIKE_REVIEW: `${review_routes}likeReview`,
}