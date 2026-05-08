import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { photographers } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import Lightbox from "../components/Lightbox";

const VISITOR_LIMIT = 3;

export default function PhotographerProfile() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const photographer = photographers.find((p) => p.id === Number(id));

  if (!photographer) {
    return (
      <main className="page">
        <div className="container not-found">
          <h2>Photographer not found.</h2>
          <Link to="/" className="btn btn-primary">
            ← Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  const { name, location, bio, avatar, images } = photographer;
  const visibleImages = isLoggedIn ? images : images.slice(0, VISITOR_LIMIT);
  const hiddenCount = images.length - VISITOR_LIMIT;

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <main className="page profile-page">
      <div className="container">
        <Link to="/" className="back-link">
          ← All Photographers
        </Link>

        {/* Profile header */}
        <div className="profile-header">
          <img src={avatar} alt={name} className="profile-avatar" />
          <div className="profile-info">
            <span className="profile-location">{location}</span>
            <h1 className="profile-name">{name}</h1>
            <p className="profile-bio">{bio}</p>
            <div className="profile-stats">
              <span>{images.length} photos</span>
              <span className="stat-divider">·</span>
              <span>{location} Collective</span>
            </div>
          </div>
        </div>

        {/* Access notice for visitors */}
        {!isLoggedIn && hiddenCount > 0 && (
          <div className="access-notice">
            <span className="notice-icon">🔒</span>
            <div>
              <strong>Sign in to see {hiddenCount} more photo{hiddenCount > 1 ? "s" : ""}</strong>
              <p>You're viewing {VISITOR_LIMIT} of {images.length} photos in this gallery.</p>
            </div>
          </div>
        )}

        {/* Image grid */}
        <div className="image-grid">
          {visibleImages.map((img, i) => (
            <button
              key={img.id}
              className="image-tile"
              onClick={() => openLightbox(i)}
              aria-label={`Open ${img.caption}`}
            >
              <img
                src={img.url}
                alt={img.caption}
                loading="lazy"
              />
              <div className="image-overlay">
                <span className="image-caption">{img.caption}</span>
              </div>
            </button>
          ))}

          {/* Blurred locked tiles for visitors */}
          {!isLoggedIn &&
            images.slice(VISITOR_LIMIT).map((img) => (
              <div key={img.id} className="image-tile locked">
                <img
                  src={img.url}
                  alt="Locked"
                  loading="lazy"
                  className="locked-img"
                />
                <div className="locked-overlay">
                  <span className="lock-icon">🔒</span>
                  <span>Sign in to view</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={visibleImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  );
}
