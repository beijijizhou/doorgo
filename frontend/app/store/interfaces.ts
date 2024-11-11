export interface LocationType {
    lat: number;
    lng: number; // Typically "lng" is used instead of "long" for longitude
    formatted_address: string;
    name: string | undefined;
    place_id:google.maps.places.PlaceResult["place_id"]| undefined,
}
export interface ReviewData {
    clueDescriptions: { [key: string]: string }; // Object with clues as keys and descriptions as values
    review: string;
    location: LocationType,
    likes?:number | 0,
}