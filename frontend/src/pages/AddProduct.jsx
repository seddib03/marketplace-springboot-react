import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "" // Ajout du champ stock pour correspondre à votre modèle
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      await addProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) // Assurez-vous d'envoyer le stock
      });
      setMessage({ 
        text: "Produit ajouté avec succès ! Redirection...", 
        type: "success" 
      });
      setFormData({ name: "", description: "", price: "", stock: "" });
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Erreur lors de l'ajout du produit";
      setMessage({ 
        text: errorMsg, 
        type: "error" 
      });
      console.error("Erreur lors de l'ajout du produit :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2>Ajouter un nouveau produit</h2>
        
        {message.text && (
          <div className={`alert-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Nom du produit</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nom descriptif du produit"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Décrivez les caractéristiques du produit"
            />
          </div>
          
          <div className="form-group">
            <label>Prix (€)</label>
            <div className="price-input-container">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                placeholder="0.00"
              />
              <span className="currency-symbol">€</span>
            </div>
          </div>
          
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="Quantité en stock"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Ajout en cours...
              </>
            ) : "Ajouter le produit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;