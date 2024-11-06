"use client"
import React, { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import useStore from "../../store";
export default function Userinput() {
  const { setDestination } = useStore.getState();
  const [inputValue, setInputValue] = useState("");
  const placesLibrary = useMapsLibrary("places");
  const map = useMap();
  const [service, setService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [predictions, setPredictions] = useState<Array<google.maps.places.QueryAutocompletePrediction> | []>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  useEffect(() => {

    if (placesLibrary) {
      setService(new placesLibrary.AutocompleteService());

    }
  }, [placesLibrary]);

  const updatePredictions = (inputValue: string) => {
    if (!service || inputValue.length === 0) {
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
    service.getQueryPredictions(request, (res) => {
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
    setDestination(place.description, map!);
    //   const placesService = new google.maps.places.PlacesService(map!);
    //   placesService.getDetails({ placeId: place.place_id }, (details, status) => {
    //     console.log(details)

    // });
    setPredictions([]);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  // if (!service) return null;
  return (
    <div  >

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search destination"
          value={inputValue}
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
          onClick={() => console.log("Search for " + inputValue)}
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
          Search
        </button>



      </div>
      <div>


      </div>
    </div>

  );
}
