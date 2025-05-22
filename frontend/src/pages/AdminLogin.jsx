// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api"; // même fonction que pour user

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      
    console.log("Attempting login with:", { email, password });
      const data = await login(email, password);

      // Vérifie si c'est un admin
      if (data.roles && data.roles.includes("ROLE_ADMIN")){
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/admin"); // redirige vers le dashboard
      } else {
        setError("Accès réservé aux administrateurs.");
      }
    } catch (err) {
      setError("Identifiants incorrects.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Connexion Admin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#222", color: "#fff" }}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
