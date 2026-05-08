import { Link } from "react-router-dom";

export default function PhotographerCard({ photographer }) {
  const { id, name, location, bio, avatar, images } = photographer;

  return (
    <Link to={`/photographer/${id}`} className="photographer-card">
      <div className="card-image-strip">
        {images.slice(0, 3).map((img) => (
          <div
            key={img.id}
            className="strip-img"
            style={{ backgroundImage: `url(${img.url})` }}
          />
        ))}
      </div>
      <div className="card-body">
        <div className="card-avatar-row">
          <img src={avatar} alt={name} className="card-avatar" />
          <div>
            <h3 className="card-name">{name}</h3>
            <span className="card-location">{location}</span>
          </div>
        </div>
        <p className="card-bio">{bio}</p>
        <div className="card-footer">
          <span className="card-count">{images.length} photos</span>
          <span className="card-cta">View Gallery →</span>
        </div>
      </div>
    </Link>
  );
}
