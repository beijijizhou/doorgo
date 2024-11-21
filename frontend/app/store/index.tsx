import { createReviewSlice, ReviewSlice } from './useReviewSlice';
import { createMapSlice,MapSlice  } from './useMapSlice';
import { create } from 'zustand';

const useStore = create<ReviewSlice & MapSlice>()((...a) => ({
  ...createReviewSlice(...a),
  ...createMapSlice(...a),
}))
export default useStore;