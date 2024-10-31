import { StateCreator } from 'zustand';
type locationType = string | google.maps.LatLngLiteral | google.maps.LatLng | google.maps.Place
export interface NavigationSlice {
    destination:string | google.maps.LatLngLiteral | google.maps.LatLng | google.maps.Place,
    setDestination: (newDestination: locationType) => void;

}
export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set) => ({
    destination:"",
    setDestination: (newDestination: locationType) => {
        set({ destination: newDestination})
      },
  });