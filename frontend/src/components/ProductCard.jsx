import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", margin: "10px" }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>{product.price.toFixed(2)} €</strong></p>
      <button onClick={() => addToCart(product)}>Ajouter au panier</button>
    </div>
  );
};

export default ProductCard;
