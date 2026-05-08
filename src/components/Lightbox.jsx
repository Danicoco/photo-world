import { useEffect, useCallback } from "react";

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const image = images[currentIndex];
  const total = images.length;

  const prev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const next = useCallback(() => {
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <button
          className="lightbox-nav lightbox-prev"
          onClick={prev}
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className="lightbox-image-wrapper">
          <img
            key={image.id}
            src={image.url}
            alt={image.caption}
            className="lightbox-image"
          />
        </div>

        <button
          className="lightbox-nav lightbox-next"
          onClick={next}
          aria-label="Next image"
        >
          ›
        </button>

        <div className="lightbox-footer">
          <p className="lightbox-caption">{image.caption}</p>
          <p className="lightbox-counter">
            {currentIndex + 1} / {total}
          </p>
        </div>

        <div className="lightbox-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`lightbox-dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => onNavigate(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
