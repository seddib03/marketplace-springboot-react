// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <nav style={{ padding: "10px 20px", background: "#282c34", color: "white", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "1.2rem" }}>
          Marketplace
        </Link>
      </div>
      <div>
        <Link to="/login" style={{ marginRight: 15, color: "white", textDecoration: "none" }}>
          Connexion
        </Link>
        <Link to="/register" style={{ marginRight: 15, color: "white", textDecoration: "none" }}>
          Inscription
        </Link>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Panier
        </Link>
        <Link to="/admin" style={{ margin: "0 10px" }}>Espace Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
