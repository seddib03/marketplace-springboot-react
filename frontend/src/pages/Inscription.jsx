import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Inscription = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError("Tous les champs sont obligatoires");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await API.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message ||
        err.message ||
        "Erreur lors de l'inscription";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <h2>Inscription réussie !</h2>
        <p>Redirection vers la page de connexion...</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}>
      <h2 style={{ textAlign: "center" }}>Créer un compte</h2>
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Confirmer le mot de passe :</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#222",
            color: "#fff",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "Chargement..." : "S'inscrire"}
        </button>
      </form>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </div>
    </div>
  );
};

export default Inscription;
