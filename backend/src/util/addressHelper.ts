export function extractStreetNumber(address: string) {
    
    const match = address.match(/^(\d+)\s/); // Matches the beginning of the address and looks for digits followed by a space
    return match ? match[1] : ""; // If a match is found, return the street number, otherwise null
}