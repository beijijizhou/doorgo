export interface Geolocation {
    geoCoordinates: {
        type: string; // Always 'Point'
        coordinates: [number, number]; // [longitude, latitude]
    };
    formatted_address: string;
    name?: string;
    place_id?: string;
    subtype?: string;
}

export interface LocationData {
    geolocation: Geolocation,
    reviewHistory: ReviewData[]
    isNearby?: boolean,
}
export interface ReviewData {
    clueDescriptions: { [key: string]: string }; // Object with clues as keys and descriptions as values
    review: string;
    likes: number | 0,
    _id?: string,
    createdAt?: string;
}

export interface LocationDataAPI {
    locationData: LocationData,
    isNearby: boolean,
}

export const geolocation: Geolocation = {
    geoCoordinates: {
        type: "Point",
        coordinates: [-73.9553663, 40.7656066], // [longitude, latitude]
    },
    formatted_address: "1305 York Ave, New York, NY 10021, USA",
    name: "1305 York Ave",
    place_id: "ChIJdbJa3MNYwokRbt4-Xg85VBY",
};