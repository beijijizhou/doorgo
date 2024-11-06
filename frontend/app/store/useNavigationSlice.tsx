import { StateCreator } from 'zustand';
type locationType = string | google.maps.LatLngLiteral | google.maps.LatLng | google.maps.Place
export interface NavigationSlice {
    
    destination:string | google.maps.LatLngLiteral | google.maps.LatLng | google.maps.Place,
    setDestination: (newDestination: locationType,map:google.maps.Map) => void;
    
}
export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set) => ({
    destination:"",
    map: null, 
    setDestination: (newDestination: locationType) => {
        set({ destination: newDestination})
        console.log(newDestination)
        // map.setCenter(newDestination as google.maps.LatLngLiteral);
      },
  });