export interface Geolocation {
    lat: number;
    lng: number;
    formatted_address: string;
    name: string | undefined;
    place_id?: google.maps.places.PlaceResult["place_id"] | undefined;
}

export interface LocationData {
    geolocation: Geolocation,
    reviewHistory: ReviewData[]
    reviewData?:ReviewData,
}
export interface ReviewData {
    clueDescriptions: { [key: string]: string }; // Object with clues as keys and descriptions as values
    review: string;
    likes?: number | 0,
    _id?:string,
}
