import PhotographerCard from "../components/PhotographerCard";
import LocationFilter from "../components/LocationFilter";
import { usePhotographers } from "../hooks/usePhotographers";

export default function Home() {
  const { photographers, allLocations, selectedLocation, setSelectedLocation } =
    usePhotographers();

  return (
    <main className="page home-page">
      <div className="hero">
        <p className="hero-eyebrow">Photography Collective</p>
        <h1 className="hero-title">
          Discover<br />
          <em>Remarkable</em><br />
          Photographers
        </h1>
        <p className="hero-sub">
          Browse portfolios from Suffolk, Norfolk & Epping — sign in to unlock full galleries.
        </p>
      </div>

      <div className="container">
        <LocationFilter
          locations={allLocations}
          selected={selectedLocation}
          onSelect={setSelectedLocation}
        />

        {photographers.length === 0 ? (
          <div className="empty-state">
            <span>🔍</span>
            <p>No photographers found in {selectedLocation}.</p>
          </div>
        ) : (
          <div className="photographer-grid">
            {photographers.map((p) => (
              <PhotographerCard key={p.id} photographer={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
