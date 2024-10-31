"use client"
import { APIProvider, Map, } from '@vis.gl/react-google-maps';
import React from 'react'
import Userinput from '../Userinput/index';
export default function MapService() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const MAP_ID = "ID";
  const zoomLevel = 20
  const defaultLocation = {
    // Default to New York City
    lat: 40.7128,
    lng: -74.0060
  };
  
  return (
    <div style={{ display: 'flex' }}>
      {defaultLocation && <APIProvider apiKey={API_KEY as string}>
        <Map
          style={{ width: '90vw', height: '90vh' }}
          defaultCenter={defaultLocation}
          defaultZoom={zoomLevel}
          mapId={MAP_ID}
        />
        <Userinput></Userinput>
      </APIProvider>}

    </div>
  )
}