/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from "react";
import { useMap, useMapsLibrary, AdvancedMarker } from "@vis.gl/react-google-maps";
import useStore from "../../store";
import { Geolocation } from "@/app/store/interfaces";
export default function Userinput() {
  const { setDestination, setMap } = useStore.getState();
  const destinationData = useStore((state) => state.destinationData);
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

    // const searchValue = destination || inputValue;
    const searchValue = "bmcc"
    // setReviewHistory();
    if (!searchValue) return
    const request = { query: searchValue };

    placesService?.textSearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const result = results![0];
        const newDestination: Geolocation = {
          lat: result.geometry!.location!.lat(),
          lng: result.geometry!.location!.lng(),
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

  return (
    <div  >
      <AdvancedMarker position={{ lat: destinationData!.geolocation.lat, lng: destinationData!.geolocation.lng }}></AdvancedMarker>
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

      <div>
        <button
          onClick={() => handleSearch()}
          style={{
            padding: "10px 15px",
            fontSize: "1rem",
            backgroundColor: "#5dade2", // Lighter blue background
            color: "white", // White text
            border: "none", // Remove border
            cursor: "pointer", // Pointer cursor on hover
            transition: "background-color 0.3s ease",


          }}
          className="mx-auto block"
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement; // Cast to HTMLButtonElement
            target.style.backgroundColor = "#2980b9"; // Darker blue on hover
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement; // Cast to HTMLButtonElement
            target.style.backgroundColor = "#5dade2"; // Revert to original lighter blue
          }}
        >
          Get Reviews
        </button>



      </div>
      <div>


      </div>
    </div>

  );
}
