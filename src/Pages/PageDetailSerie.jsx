import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_URL from "../Services/api";

function PageDetailSerie() {
  const { id } = useParams();

  const [serie, setSerie] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/tv/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSerie(data);
        setChargement(false);
      })
      .catch((error) => {
        console.error(error);
        setErreur("Impossible de charger le détail de la série.");
        setChargement(false);
      });
  }, [id]);

  if (chargement) {
    return (
      <main>
        <p>Chargement du détail de la série...</p>
      </main>
    );
  }

  if (erreur) {
    return (
      <main>
        <p>{erreur}</p>
        <Link to="/recherche-series">Retour à la recherche</Link>
      </main>
    );
  }

  if (!serie) {
    return (
      <main>
        <p>Aucune série trouvée.</p>
        <Link to="/recherche-series">Retour à la recherche</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/recherche-series">Retour à la recherche</Link>

      <h1>{serie.name}</h1>

      <p>
        <strong>Première diffusion :</strong>{" "}
        {serie.first_air_date || "Non renseignée"}
      </p>

      <p>
        <strong>Synopsis :</strong>{" "}
        {serie.overview || "Aucun synopsis disponible."}
      </p>

      <h2>Genres</h2>

      {serie.genres && serie.genres.length > 0 ? (
        <ul>
          {serie.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun genre renseigné.</p>
      )}

      <h2>Casting principal</h2>

      {serie.credits?.cast && serie.credits.cast.length > 0 ? (
        <ul>
          {serie.credits.cast.slice(0, 5).map((acteur) => (
            <li key={acteur.id}>
              {acteur.name} — {acteur.character}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun casting renseigné.</p>
      )}
    </main>
  );
}

export default PageDetailSerie;