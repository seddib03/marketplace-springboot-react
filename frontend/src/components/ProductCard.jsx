// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Produit ajouté au panier !");
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "5px" }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>{product.price} €</strong>
      <br />
      <button onClick={handleAddToCart}>Ajouter au panier</button>
    </div>
  );
};


export default ProductCard;
