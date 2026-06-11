import { useState } from "react";
import API_URL from "../Services/api";
import MediaCard from "../Components/MediaCard";

function PageRechercheSeries() {
  const [recherche, setRecherche] = useState("");
  const [series, setSeries] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (recherche.trim() === "") {
      setErreur("Veuillez saisir un nom de série.");
      return;
    }

    setChargement(true);
    setErreur("");

    fetch(`${API_URL}/api/tv/search?query=${recherche}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSeries(data.results || data);
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
      <h1>Recherche de séries</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="recherche-serie">Nom de la série</label>

        <input
          type="text"
          id="recherche-serie"
          value={recherche}
          onChange={(event) => setRecherche(event.target.value)}
          placeholder="Exemple : Breaking Bad"
        />

        <button type="submit">Rechercher</button>
      </form>

      {chargement && <p>Chargement des séries...</p>}

      {erreur && <p>{erreur}</p>}

      {!chargement && series.length === 0 && recherche !== "" && !erreur && (
        <p>Aucune série trouvée.</p>
      )}

      <section className="media-grid">
        {series.map((serie) => (
          <MediaCard key={serie.id} media={serie} />
        ))}
      </section>
    </main>
  );
}

export default PageRechercheSeries;