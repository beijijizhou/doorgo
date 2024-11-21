export interface Geolocation {
    geoCoordinates: {
        type: string; // Always 'Point'
        coordinates: [number, number]; // [longitude, latitude]
    };
    formatted_address: string;
    name?: string;
    place_id?: string;
}

export interface LocationData {
    geolocation: Geolocation,
    reviewHistory: ReviewData[]
    reviewData?: ReviewData,
}
export interface ReviewData {
    clueDescriptions: { [key: string]: string }; // Object with clues as keys and descriptions as values
    review: string;
    likes?: number | 0,
    _id?: string,
}

export interface LocationDataAPI {
    locationData: LocationData,
    isExact: boolean,
}