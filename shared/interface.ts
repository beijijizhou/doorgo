export interface User { id: number; name: string; email: string; }

export interface GeolocationType {
    geoCoordinates: {
        type: string; // Always 'Point'
        coordinates: [number, number]; // [longitude, latitude]
    };
    formatted_address: string;
    name?: string;
    place_id?: string;
}