/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
export default function GoogleNavigationButton() {
    const startGoogleNavigation = (destination: { lat: number; lng: number }) => {
        const { lat, lng } = destination;
        // console.log("satrt")
        // const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
        // window.open(googleMapsUrl, '_blank');
    };

    const handleNavigation = () => {
        const destination = { lat: 37.7749, lng: -122.4194 }; // Replace with your destination coordinates
        startGoogleNavigation(destination);
    };
    return (
        <button onClick={handleNavigation} className='btn-primary'>
            Start Navigation
        </button>
    );
}  