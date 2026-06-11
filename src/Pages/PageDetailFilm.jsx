import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import API_URL from "../Services/api";

function PageDetailFilm() {
  const { id } = useParams();
  const location = useLocation();

  const retourUrl = location.state?.retourUrl || "/recherche-films";
  const ancienneRecherche = location.state?.recherche || "";

  const [film, setFilm] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  const lienRetour = (
    <Link
      to={retourUrl}
      state={{
        recherche: ancienneRecherche,
      }}
    >
      Retour à la recherche
    </Link>
  );

  useEffect(() => {
    fetch(`${API_URL}/api/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFilm(data);
        setChargement(false);
      })
      .catch((error) => {
        console.error(error);
        setErreur("Impossible de charger le détail du film.");
        setChargement(false);
      });
  }, [id]);

  if (chargement) {
    return (
      <main>
        <p>Chargement du détail du film...</p>
      </main>
    );
  }

  if (erreur) {
    return (
      <main>
        <p>{erreur}</p>
        {lienRetour}
      </main>
    );
  }

  if (!film) {
    return (
      <main>
        <p>Aucun film trouvé.</p>
        {lienRetour}
      </main>
    );
  }

  return (
    <main>
      {lienRetour}

      <h1>{film.title}</h1>

      <p>
        <strong>Date de sortie :</strong>{" "}
        {film.release_date || "Non renseignée"}
      </p>

      <p>
        <strong>Synopsis :</strong>{" "}
        {film.overview || "Aucun synopsis disponible."}
      </p>

      <h2>Genres</h2>

      {film.genres && film.genres.length > 0 ? (
        <ul>
          {film.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun genre renseigné.</p>
      )}

      <h2>Casting principal</h2>

      {film.credits?.cast && film.credits.cast.length > 0 ? (
        <ul>
          {film.credits.cast.slice(0, 5).map((acteur) => (
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

export default PageDetailFilm;