/* eslint-disable @typescript-eslint/no-unused-vars */
import useStore from '@/app/store';
import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps'
import React from 'react'

export default function NearbyLocation() {
  const locationData = useStore((state) => state.locationData)
  const geolocation = useStore((state) => state.geolocation);
  const map = useMap();
  const originCoordinates = geolocation!.geoCoordinates.coordinates
  const destCoordinates = locationData!.geolocation.geoCoordinates.coordinates
  const position = destCoordinates ? { lat: destCoordinates[1], lng: destCoordinates[0] } : null;

  const changeBounds = () => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(originCoordinates[1], originCoordinates[0]));
    bounds.extend(new google.maps.LatLng(destCoordinates[1], destCoordinates[0]));

    const margin = 0.00000005; // Adjust this value to control the padding
    const extendedBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds.getSouthWest().lat() - margin, bounds.getSouthWest().lng() - margin),
      new google.maps.LatLng(bounds.getNorthEast().lat() + margin, bounds.getNorthEast().lng() + margin)
    );

    map!.fitBounds(extendedBounds);
  }

  changeBounds()
  return (
    <div>
      <h1>{locationData!.isNearby} </h1>
      <AdvancedMarker position={position} title={"doorfront"}>
        <Pin background={'#00FF00'} glyphColor={'#333'} borderColor={'#333'} />
      </AdvancedMarker>
    </div>
  )
}
