// const { parse } = require('@universe/address-parser');

// import { } from '@universe/address-parser';

interface NormalizedAddress {
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    zip: string;
}

export async function normalizeAddress(formatted_address: string): Promise<NormalizedAddress> {
    // Split the address into parts
    const parts = formatted_address.split(',').map(part => part.trim());

    // Handle street address (first part)
    const streetPart = parts[0];
    const streetMatch = streetPart.match(/(\d+)\s+(.*)/);
    const streetNumber = streetMatch?.[1] || '';
    const streetName = (streetMatch?.[2] || '')
        .replace('West', 'W')
        .replace('East', 'E')
        .replace('North', 'N')
        .replace('South', 'S')
        .toLowerCase();

    // Extract city, state, and zip
    const city = parts[1]?.replace('City of ', '').trim() || '';
    const stateZip = parts[2]?.split(' ') || [];
    const state = stateZip[0] || '';
    const zip = stateZip[1] || '';

    return {
        streetNumber,
        streetName,
        city: city.toLowerCase(),
        state: state.toUpperCase(),
        zip
    };
}

// Example addresses from Google Maps and Nominatim
const googleAddress = '10 W 20th St, New York, NY 10011, USA';
const nominatimAddress = '6 West 20th Street, City of New York, 10011, United States';

// Compare addresses
async function compareAddresses(addr1: string, addr2: string): Promise<boolean> {
    const norm1 = await normalizeAddress(addr1);
    const norm2 = await normalizeAddress(addr2);

    return norm1.streetNumber === norm2.streetNumber &&
        norm1.streetName === norm2.streetName &&
        norm1.city === norm2.city &&
        norm1.state === norm2.state &&
        norm1.zip === norm2.zip;
}

export const distance = (
    coord1: latlng, // [latitude, longitude]
    coord2: latlng,  // [latitude, longitude]
): number => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c * 1000; // Return distance in meters
};
export const reverse = (coords: latlng) => {
    return [coords[1], coords[0]] as lnglat
}
export type latlng = [latitude: number, longitude: number];
export type lnglat = [longitude: number, latitude: number];

