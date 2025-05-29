import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  LogOut,
  PackagePlus,
  Users,
  ShoppingCart,
} from "lucide-react";
import "./AdminDashboard.css"; // ⬅️ Import du style externe

import { LogOut, PackagePlus, Users, ShoppingCart } from "lucide-react";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Authentification admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !Array.isArray(user.roles) || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/login");
    }
  }, [navigate]);

 HEAD
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1 className="admin-title">🎯 Tableau de bord Administrateur</h1>

        <div className="admin-grid">
          <Link to="/admin/add-product" className="admin-link">
            <PackagePlus className="admin-icon" />
            <h2 className="admin-text">Ajouter un produit</h2>
=======
  // Charger les produits
  useEffect(() = {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erreur chargement des produits", err));
  }, []);

  const lowStock = products.filter((p) = p.stock 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">🎯 Tableau de bord Admin</h1>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/admin/login");
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

        {/* Boutons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link to="/admin/add-product" className="dashboard-card">
            <PackagePlus className="w-8 h-8 text-indigo-600 mb-2" />
            <h2 className="text-lg font-semibold">Ajouter un produit</h2>

          </Link>

          <Link to="/admin/manage-orders" className="admin-link">
            <ShoppingCart className="admin-icon" />
            <h2 className="admin-text">Statistique de Produits</h2>
          </Link>

          <Link to="/admin/manage-users" className="admin-link">
            <Users className="admin-icon" />
            <h2 className="admin-text">Gérer les utilisateurs</h2>
          </Link>
        </div>


        <div className="admin-logout-wrapper">
          <button onClick={handleLogout} className="admin-logout">
            <LogOut className="logout-icon" />
            Se déconnecter
          </button>
        </div>

        {/* Statistiques des produits */}
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">📦 Statistiques des produits</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md bg-white text-left">
            <thead className="bg-indigo-100 text-indigo-800 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Nom</th>
                <th className="px-4 py-3 border">Description</th>
                <th className="px-4 py-3 border">Prix (€)</th>
                <th className="px-4 py-3 border">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={
                    product.stock < 5 ? "bg-red-50 text-red-800" : "hover:bg-gray-50"
                  }
                >
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.description}</td>
                  <td className="px-4 py-2 border">{product.price.toFixed(2)}</td>
                  <td className="px-4 py-2 border font-bold">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerte stock faible */}
        {lowStock.length > 0 && (
          <div className="mt-6 bg-red-100 text-red-800 border-l-4 border-red-500 p-4 rounded">
            ⚠️ {lowStock.length} produit(s) avec un stock faible (moins de 5 unités) !
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
