interface NormalizedAddress {
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    zip: string;
}

export async function normalizeAddress(formatted_address: string): Promise<NormalizedAddress> {
    const parts = formatted_address.split(',').map(part => part.trim());

    const streetPart = parts[0];
    const streetMatch = streetPart.match(/(\d+)\s+(.*)/);
    const streetNumber = streetMatch?.[1] || '';
    const streetName = (streetMatch?.[2] || '')
        .replace('West', 'W')
        .replace('East', 'E')
        .replace('North', 'N')
        .replace('South', 'S')
        .toLowerCase();

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

export async function compareAddresses(addr1: string, addr2: string): Promise<boolean> {
    const norm1 = await normalizeAddress(addr1);
    const norm2 = await normalizeAddress(addr2);

    return norm1.streetNumber === norm2.streetNumber &&
        norm1.streetName === norm2.streetName &&
        norm1.city === norm2.city &&
        norm1.state === norm2.state &&
        norm1.zip === norm2.zip;
} 