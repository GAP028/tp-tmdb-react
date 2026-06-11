import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/recherche-films">Recherche films</Link>
        <Link to="/recherche-series">Recherche séries</Link>
      </nav>
    </header>
  );
}

export default Header;