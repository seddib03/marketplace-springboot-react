// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "5px" }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>{product.price} €</strong>
    </div>
  );
};

export default ProductCard;
