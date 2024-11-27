/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { APIProvider, Map, } from '@vis.gl/react-google-maps';
import React from 'react'
import Userinput from '../Userinput/index';
import ReviewHistory from '../ReviewHistory';
export default function MapService() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const MAP_ID = "ID";
  const zoomLevel = 13
  const defaultLocation = {
    // Default to New York City
    lat: 40.7128,
    lng: -74.0060
  };
  return (
    <div >
      {defaultLocation && <APIProvider apiKey={API_KEY as string}>
        <Userinput></Userinput>
        <div style={{ display: 'flex', width: '100vw', height: '90vh' }}>
          <Map
            style={{ flex: 6, width: '100%', height: '100%' }}  // Use flex number, width and height to fill available space
            defaultCenter={defaultLocation}
            defaultZoom={zoomLevel}
            mapId={MAP_ID}
          />
          <div style={{ flex: 4, padding: '10px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
            <ReviewHistory />
          </div>
        </div>



      </APIProvider>}

    </div>
  )
}