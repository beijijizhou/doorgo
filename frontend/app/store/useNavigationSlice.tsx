import { StateCreator } from 'zustand';
import { LocationType } from './interfaces';

export interface NavigationSlice {

    destination: LocationType | null,
    setDestination: (newDestination: LocationType) => void;

}
export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set) => ({
    destination: null,
    map: null,
    setDestination: (newDestination: LocationType) => {
        set({ destination: newDestination })
        console.log(newDestination);
        // map.setCenter(newDestination as google.maps.LatLngLiteral);
    },
});