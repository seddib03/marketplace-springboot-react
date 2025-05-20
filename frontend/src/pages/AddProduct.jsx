import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const product = { name, description, price: parseFloat(price) };
      await addProduct(product);
      setMessage("Produit ajouté avec succès !");
      setName("");
      setDescription("");
      setPrice("");
      setTimeout(() => navigate("/"), 1500); // rediriger vers accueil
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      setMessage("Erreur lors de l'ajout.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Ajouter un produit</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description :</label>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Prix (€) :</label>
          <input
            type="number"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#222", color: "#fff", border: "none" }}>
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
