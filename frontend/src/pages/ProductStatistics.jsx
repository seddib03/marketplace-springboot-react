// src/pages/admin/ProductStatistics.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductStatistics.css";

const ProductStatistics = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:8083/api/products") // change cette URL si besoin
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erreur lors du chargement des produits :", err));
  }, []);

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock < 5).length;
  const averagePrice = (products.reduce((acc, p) => acc + p.price, 0) / totalProducts || 0).toFixed(2);

  return (
    <div className="statistics-container">
      <h1>📊 Statistiques des produits</h1>

      <ul className="stats-list">
        <li>Total de produits : <strong>{totalProducts}</strong></li>
        <li>Produits en stock faible : <strong>{lowStock}</strong></li>
        <li>Prix moyen : <strong>{averagePrice} €</strong></li>
      </ul>

      <h2>📦 Détails des produits</h2>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix (€)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className={p.stock < 5 ? "low-stock" : ""}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductStatistics;
