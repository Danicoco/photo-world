import { useState, useMemo } from "react";
import { photographers, LOCATIONS } from "../data/mockData";

export function usePhotographers() {
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filtered = useMemo(() => {
    if (selectedLocation === "All") return photographers;
    return photographers.filter((p) => p.location === selectedLocation);
  }, [selectedLocation]);

  return {
    photographers: filtered,
    allLocations: ["All", ...LOCATIONS],
    selectedLocation,
    setSelectedLocation,
  };
}
