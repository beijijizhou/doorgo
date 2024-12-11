/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
export default function GoogleNavigationButton() {
  

    const handleNavigation = () => {
        const lat =  40.7178742;
        const lng =  -74.0117827;
        // const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
        window.open(googleMapsUrl, '_blank');
    };
    return (
        <button onClick={handleNavigation} className='btn-primary'>
            Start Navigation
        </button>
    );
}  