import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API_URL from "../Services/api";
import MediaCard from "../Components/MediaCard";

function PageRechercheFilms() {
  const location = useLocation();

  const [recherche, setRecherche] = useState("");
  const [films, setFilms] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const rechercherFilms = (valeurRecherche) => {
    if (valeurRecherche.trim() === "") {
      setErreur("Veuillez saisir un nom de film.");
      return;
    }

    setChargement(true);
    setErreur("");

    fetch(`${API_URL}/api/movies/search?query=${valeurRecherche}`)
      .then((response) => response.json())
      .then((data) => {
        setFilms(data.results || data);
        setChargement(false);
      })
      .catch((error) => {
        console.error(error);
        setErreur("Une erreur est survenue pendant la recherche.");
        setChargement(false);
      });
  };

  useEffect(() => {
    if (location.state?.recherche) {
      setRecherche(location.state.recherche);
      rechercherFilms(location.state.recherche);
    }
  }, [location.state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    rechercherFilms(recherche);
  };

  return (
    <main>
      <h1>Recherche de films</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="recherche-film">Nom du film</label>

        <input
          type="text"
          id="recherche-film"
          value={recherche}
          onChange={(event) => setRecherche(event.target.value)}
          placeholder="Exemple : Avatar"
        />

        <button type="submit">Rechercher</button>
      </form>

      {chargement && <p>Chargement des films...</p>}

      {erreur && <p>{erreur}</p>}

      {!chargement && films.length === 0 && recherche !== "" && !erreur && (
        <p>Aucun film trouvé.</p>
      )}

      <section className="media-grid">
        {films.map((film) => (
          <MediaCard
            key={film.id}
            media={film}
            type="film"
            recherche={recherche}
          />
        ))}
      </section>
    </main>
  );
}

export default PageRechercheFilms;