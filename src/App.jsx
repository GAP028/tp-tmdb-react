import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import PageAccueil from "./Pages/PageAccueil";
import PageRechercheFilms from "./Pages/PageRechercheFilms";
import PageRechercheSeries from "./Pages/PageRechercheSeries";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PageAccueil />} />
        <Route path="recherche-films" element={<PageRechercheFilms />} />
        <Route path="recherche-series" element={<PageRechercheSeries />} />
      </Route>
    </Routes>
  );
}

export default App;