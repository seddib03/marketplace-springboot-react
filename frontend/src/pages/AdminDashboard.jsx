import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut,
  PackagePlus,
  Users,
  ShoppingCart,
} from "lucide-react";
import "./AdminDashboard.css"; // ⬅️ Import du style externe

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !Array.isArray(user.roles) || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/login");
    }
  }, [navigate]);

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
          </Link>

          <Link to="/admin/manage-orders" className="admin-link">
            <ShoppingCart className="admin-icon" />
            <h2 className="admin-text">Gérer les commandes</h2>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
