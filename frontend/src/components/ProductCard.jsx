import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">{product.price.toFixed(2)} €</p>
      <p className={`product-stock ${product.stock < 5 ? "low-stock" : ""}`}>
        Stock : {product.stock}
      </p>
    </div>
  );
};

export default ProductCard;
