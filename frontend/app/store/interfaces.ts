export interface LocationType {
    lat: number;
    lng: number; // Typically "lng" is used instead of "long" for longitude
    formatted_address: string;
    name: string | undefined;
    place_id:google.maps.places.PlaceResult["place_id"]| undefined,
}