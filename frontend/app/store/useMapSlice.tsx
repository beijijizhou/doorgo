
import { StateCreator } from 'zustand';

export interface MapSlice {
    map: google.maps.Map | null;
    setMap: (map: google.maps.Map | null) => void; // Method to set the map
}

export const createMapSlice: StateCreator<MapSlice, [], []> = (set,) => ({
    map: null,
    setMap: (map) => set({ map }), // Method to update the map
});
