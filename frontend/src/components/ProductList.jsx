import React, { useEffect, useState, useContext } from "react";
import { getProducts } from "../services/api";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";  // si tu as un contexte panier

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupère la fonction d'ajout au panier depuis le contexte
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Chargement des produits...</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
