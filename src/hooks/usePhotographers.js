import { useState, useMemo, useEffect } from "react";
import { photographers, LOCATIONS } from "../data/mockData";

export function usePhotographers() {
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filtered = useMemo(() => {
    if (selectedLocation === "All") return photographers;
    return photographers.filter((p) => p.location === selectedLocation);
  }, [selectedLocation]);

  // Get location 
  // set location to url params
  // set location.
  // read from url params and set location on page load
  const onChangeLocation = (location) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("location", location);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState(null, "", newUrl);    
    setSelectedLocation(location);
  }

  // useEffect that will read from params and set state locally
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get("location");
    if (location) {
      setSelectedLocation(location);
    }
  }, []);

  return {
    photographers: filtered,
    allLocations: ["All", ...LOCATIONS],
    selectedLocation,
    onChangeLocation
  };
}
