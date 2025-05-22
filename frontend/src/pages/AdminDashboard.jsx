// src/pages/AdminDashboard.jsx
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Utilisateur récupéré depuis le localStorage :", user);

  if (!user || !user.roles.includes("ROLE_ADMIN")) {
    navigate("/admin/login");
  }
}, [navigate]);


  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenue dans le panneau d'administration</h1>
      <p>Choisissez une action :</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/admin/add-product" style={linkStyle}>
            ➕ Ajouter un produit
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/admin/orders" style={linkStyle}>
            📦 Gérer les commandes (à venir)
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/admin/users" style={linkStyle}>
            👤 Gérer les utilisateurs (à venir)
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/admin/login");
            }}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              marginTop: "20px"
            }}
          >
            🔓 Déconnexion
          </button>
        </li>
      </ul>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "blue",
  fontSize: "16px",
  fontWeight: "bold"
};

export default AdminDashboard;
