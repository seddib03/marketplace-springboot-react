import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, PackagePlus, Users, ShoppingCart } from "lucide-react"; // Icônes modernes

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !Array.isArray(user.roles) || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-indigo-800 mb-10 text-center">
          🎯 Tableau de bord Administrateur
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/add-product" className="dashboard-card">
            <PackagePlus className="w-8 h-8 text-indigo-600 mb-2" />
            <h2 className="text-lg font-semibold">Ajouter un produit</h2>
          </Link>

          <Link to="/admin/manage-orders" className="dashboard-card">
            <ShoppingCart className="w-8 h-8 text-indigo-600 mb-2" />
            <h2 className="text-lg font-semibold">Gérer les commandes</h2>
          </Link>

          <Link to="/admin/manage-users" className="dashboard-card">
            <Users className="w-8 h-8 text-indigo-600 mb-2" />
            <h2 className="text-lg font-semibold">Gérer les utilisateurs</h2>
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/admin/login");
          }}
          className="mt-10 flex items-center justify-center gap-2 w-full py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
        >
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
