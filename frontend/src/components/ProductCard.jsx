import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card" style={{ margin: "10px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", width: "250px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>{product.price.toFixed(2)} €</strong></p>
      <p>Stock: {product.stock}</p>

      <button
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: product.stock === 0 ? "#aaa" : "#db2777",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: product.stock === 0 ? "not-allowed" : "pointer",
          fontWeight: "bold",
          width: "100%"
        }}
      >
        {product.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
      </button>
    </div>
  );
};

export default ProductCard;
