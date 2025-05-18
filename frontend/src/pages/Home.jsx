// src/pages/Home.jsx
import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenue sur la Marketplace</h1>
      <p>Explorez nos produits et faites vos achats en toute simplicité.</p>
      <ProductList />
    </div>
  );
};

export default Home;
