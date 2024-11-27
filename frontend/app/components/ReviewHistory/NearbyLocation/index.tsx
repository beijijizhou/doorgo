import useStore from '@/app/store';
import { AdvancedMarker } from '@vis.gl/react-google-maps'
import React from 'react'

export default function NearbyLocation() {
  const locationData = useStore((state) => state.locationData)

  const coordinates = locationData?.geolocation.geoCoordinates.coordinates
  const position = coordinates ? { lat: coordinates[1], lng: coordinates[0] } : null;
  return (
    <div>
      <h1>{locationData!.isNearby}</h1>
      <AdvancedMarker position={position} draggable={true}></AdvancedMarker>
    </div>
  )
}
