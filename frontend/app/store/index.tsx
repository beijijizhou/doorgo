import { createReviewSlice, ReviewSlice } from './useReviewSlice';
import { create } from 'zustand';

const useStore = create<ReviewSlice>()((...a) => ({
  ...createReviewSlice(...a),

}))
export default useStore;