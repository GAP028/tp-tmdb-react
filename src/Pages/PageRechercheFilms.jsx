import { useState } from "react";
import API_URL from "../Services/api";

function PageRechercheFilms() {
  const [recherche, setRecherche] = useState("");
  const [films, setFilms] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (recherche.trim() === "") {
      setErreur("Veuillez saisir un nom de film.");
      return;
    }

    setChargement(true);
    setErreur("");

    fetch(`${API_URL}/api/movies/search?query=${recherche}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFilms(data.results || data);
        setChargement(false);
      })
      .catch((error) => {
        console.error(error);
        setErreur("Une erreur est survenue pendant la recherche.");
        setChargement(false);
      });
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

      <p>Nombre de films trouvés : {films.length}</p>
    </main>
  );
}

export default PageRechercheFilms;