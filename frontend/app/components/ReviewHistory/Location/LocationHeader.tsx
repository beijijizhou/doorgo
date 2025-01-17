import React from 'react'
import useStore from "@/app/store";
import NearbyLocation from './NearbyLocation';
const DisplayDoorType = ({ doorType }: { doorType?: string }) => {
  return (
    <h1 className="text-xl font-bold text-center text-[#895129]">
      {doorType ? "Door Type: " + doorType : "No door type at the moment"}
    </h1>
  );
};


export const LocationHeader = () => {
  const locationData = useStore((state) => state.locationData)
  return (
    <div>
      {locationData && 
      <div>
        <h1 className="text-xl font-bold text-center text-blue-600">
          {locationData.geolocation.formatted_address}

        </h1>
        <h1 className="text-xl font-bold text-center text-[#895129]">  GeoDistance: {" " + locationData.geoDistance + " "} meters</h1>
        <DisplayDoorType doorType={locationData.doorType} />
        <NearbyLocation />
      </div>}
    </div>
  )
}

