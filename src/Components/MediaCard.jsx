import { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../Services/api";

function MediaCard({ media, type, recherche }) {
  const [messageFavori, setMessageFavori] = useState("");

  const imageUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w300${media.poster_path}`
    : "https://via.placeholder.com/300x450?text=Pas+d%27image";

  const titre = media.title || media.name;
  const date = media.release_date || media.first_air_date || "Non renseignée";

  const detailUrl = type === "film" ? `/film/${media.id}` : `/serie/${media.id}`;
  const retourUrl = type === "film" ? "/recherche-films" : "/recherche-series";

  const ajouterAuxFavoris = () => {
    const filmFavori = {
      id: media.id,
      title: media.title,
      poster_path: media.poster_path,
      release_date: media.release_date,
      overview: media.overview,
      status: "pas vu",
    };

    fetch(`${API_URL}/api/favorites/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filmFavori),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout aux favoris");
        }

        return response.json();
      })
      .then(() => {
        setMessageFavori("Film ajouté aux favoris !");
      })
      .catch((error) => {
        console.error(error);
        setMessageFavori("Impossible d'ajouter ce film aux favoris.");
      });
  };

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

        <Link
          to={detailUrl}
          state={{
            retourUrl: retourUrl,
            recherche: recherche,
          }}
        >
          Voir le détail
        </Link>

        {type === "film" && (
          <button type="button" onClick={ajouterAuxFavoris}>
            Ajouter aux favoris
          </button>
        )}

        {messageFavori && <p>{messageFavori}</p>}
      </div>
    </article>
  );
}

export default MediaCard;