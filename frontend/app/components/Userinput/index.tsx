/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from "react";
import { useMap, useMapsLibrary, AdvancedMarker } from "@vis.gl/react-google-maps";
import useStore from "../../store";
import { Geolocation } from "@/app/store/interfaces";
import GoogleNavigationButton from "../GoogleNavigationButton";
export default function Userinput() {
  const { setDestination, setMap, setShowReviewHistory } = useStore.getState();
  const destinationData = useStore((state) => state.locationData);
  const newGeolocation = useStore((state) => state.geolocation);
  const [inputValue, setInputValue] = useState("");
  const placesLibrary = useMapsLibrary("places");
  const map = useMap();
  const [autoComplete, setAutoComplete] = useState<google.maps.places.AutocompleteService | null>(null);
  const [predictions, setPredictions] = useState<Array<google.maps.places.QueryAutocompletePrediction> | []>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [placesService, setPalcesService] = useState<google.maps.places.PlacesService | null>(null);
  useEffect(() => {

    if (placesLibrary) {
      setAutoComplete(new placesLibrary.AutocompleteService());
      setPalcesService(new google.maps.places.PlacesService(map!))
    }
    if (map) {
      setMap(map);
    }
  }, [placesLibrary, map, destinationData, setMap]);

  const updatePredictions = (inputValue: string) => {
    if (!autoComplete || inputValue.length === 0) {
      setPredictions([]);
      return;
    }
    const newYorkBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(40.477399, -74.25909), // Southwest corner of NYC
      new google.maps.LatLng(40.917577, -73.700272) // Northeast corner of NYC
    );
    // const request = { input: inputValue };
    const request = {
      input: inputValue,
      bounds: newYorkBounds,
    };
    autoComplete.getQueryPredictions(request, (res) => {
      setPredictions(res || []);
    });
  };

  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setInputValue(value);
    updatePredictions(value);
  };

  const handleSelectedPlace = (
    place: google.maps.places.QueryAutocompletePrediction
  ) => {
    setInputValue(place.description);
    handleSearch(place.description);

  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  const handleSearch = (destination?: string) => {

    const searchValue = destination || inputValue;
    if (!searchValue) return
    const request = { query: searchValue };

    placesService?.textSearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const result = results![0];
        const  coordinates = [result.geometry!.location!.lng(), result.geometry!.location!.lat()]; // [longitude, latitude]
        console.log("input", coordinates)
        console.log(result)
        const newDestination: Geolocation = {
          geoCoordinates: {
            type: "Point",
            coordinates: [result.geometry!.location!.lng(), result.geometry!.location!.lat()], // [longitude, latitude]
          },
          formatted_address: result.formatted_address! || "",
          name: result.name || "",
          place_id: result.place_id || "",
        };


        setDestination(newDestination);

      } else {
        console.error("Text search failed with status:", status);
      }
    });
    setPredictions([]);
  }
  const handleAdd = () => {
    setShowReviewHistory();
  }
  const coordinates = newGeolocation?.geoCoordinates.coordinates;
  const position = coordinates ? { lat: coordinates[1], lng: coordinates[0] } : null;
  return (

    <div  >
      {position && <AdvancedMarker position={position}></AdvancedMarker>}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search destination"
          value={inputValue}
          name={"searchBox"}
          onChange={onInputChange}
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            marginBottom: "5px",
            // overflow: "hidden",
            // whiteSpace: "nowrap",
          }}
        />
        {predictions.length > 0 && (
          <div className="suggestions"   >
            {predictions.map((place, index) => (
              <p
                style={{
                  textOverflow: 'ellipsis',
                  // whiteSpace: 'nowrap',
                }}
                key={index}
                className={`px-4 py-2 w-auto overflow-hidden text-ellipsis cursor-pointer 
                  ${hoveredIndex === index ? "bg-blue-500 text-white" : "bg-white text-black"} 
                  hover:bg-blue-300 hover:text-white`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleSelectedPlace(place)}
              >
                {place.description}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleSearch()}
          className='btn-primary'        >
          Get Reviews
        </button>
        <GoogleNavigationButton></GoogleNavigationButton>
        {newGeolocation && <button
          onClick={() => handleAdd()}
          className='btn-primary'        >
          Add Review
        </button>}
      </div>
      <div>


      </div>
    </div>

  );
}
