import { createNavigationSlice, NavigationSlice } from './useNavigationSlice';
import { create } from 'zustand';

const useStore = create<NavigationSlice >()((...a) => ({
  ...createNavigationSlice(...a),
  
}))
export default useStore;