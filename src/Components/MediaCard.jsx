import { Link } from "react-router-dom";

function MediaCard({ media, type }) {
  const imageUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w300${media.poster_path}`
    : "https://via.placeholder.com/300x450?text=Pas+d%27image";

  const titre = media.title || media.name;
  const date = media.release_date || media.first_air_date || "Non renseignée";

  const detailUrl = type === "film" ? `/film/${media.id}` : `/serie/${media.id}`;

  return (
    <article className="media-card">
      <img src={imageUrl} alt={titre} />

      <div className="media-card-content">
        <h2>{titre}</h2>

        <p>
          <strong>Date :</strong> {date}
        </p>

        <p>
          {media.overview
            ? media.overview.slice(0, 150) + "..."
            : "Aucune description disponible."}
        </p>

        <Link to={detailUrl}>Voir le détail</Link>
      </div>
    </article>
  );
}

export default MediaCard;