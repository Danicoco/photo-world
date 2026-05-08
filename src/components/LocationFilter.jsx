export default function LocationFilter({ locations, selected, onSelect }) {
  return (
    <div className="location-filter">
      <span className="filter-label">Filter by location</span>
      <div className="filter-buttons">
        {locations.map((loc) => (
          <button
            key={loc}
            className={`filter-btn ${selected === loc ? "active" : ""}`}
            onClick={() => onSelect(loc)}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}
