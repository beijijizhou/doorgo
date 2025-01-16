import axios from 'axios';

// Define the reverse geocoding URL
const REVERSE_GEOCODING_URL = 'http://localhost:8080/reverse';

// Define a function to handle the reverse geocoding request
const reverseGeocode = async (lat: number, lon: number): Promise<void> => {
  try {

    const url = `${REVERSE_GEOCODING_URL}?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

    console.log('Full Request URL:', url);

    // Now make the request
    const response = await axios.get(url);

    // Extract the display name (formatted address), name, and place_id from the response
    const formattedAddress = response.data?.display_name || 'Not available';
    const name = response.data?.name || 'Not available';
    const placeId = response.data?.place_id || 'Not available';

    // Log the results
    console.log('Reverse Geocoding Response:', response.data);
    console.log('Formatted Address:', formattedAddress);
    console.log('Name:', name);
    console.log('Place ID:', placeId);
  } catch (error) {
    console.error('Error in reverse geocoding request:', error);
  }
};



const lat = 40.7399355
const lon = -73.99205870000002


// Call the reverse geocode function
reverseGeocode(lat, lon);
