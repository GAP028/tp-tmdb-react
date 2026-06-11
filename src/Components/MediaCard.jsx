function MediaCard({ media }) {
  const imageUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w300${media.poster_path}`
    : "https://via.placeholder.com/300x450?text=Pas+d%27image";

  return (
    <article className="media-card">
      <img src={imageUrl} alt={media.title || media.name} />

      <div className="media-card-content">
        <h2>{media.title || media.name}</h2>

        <p>
          <strong>Date :</strong>{" "}
          {media.release_date || media.first_air_date || "Non renseignée"}
        </p>

        <p>
          {media.overview
            ? media.overview.slice(0, 150) + "..."
            : "Aucune description disponible."}
        </p>
      </div>
    </article>
  );
}

export default MediaCard;