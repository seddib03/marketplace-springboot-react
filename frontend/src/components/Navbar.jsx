import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import './Navbar.css';  // Import des styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">
          <span role="img" aria-label="shopping bag" className="emoji">🛍️</span> MarketPlace
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/login" className="navbar-link">Connexion</Link>
        <Link to="/register" className="navbar-link">Inscription</Link>
        <Link to="/cart" className="navbar-link cart-link" aria-label="Panier">
          <FaShoppingCart size={20} />
          {/* Pas de compteur ici */}
        </Link>
        <Link to="/admin" className="navbar-link">Espace Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
