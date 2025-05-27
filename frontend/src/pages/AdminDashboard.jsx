import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !Array.isArray(user.roles) || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord administrateur</h1>
        
        <div className="space-y-4 mb-8">
          <Link
            to="/admin/add-product"
            className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
          >
            <h2 className="font-medium text-gray-800">➕ Ajouter un produit</h2>
          </Link>
          
          <Link
            to="/admin/manage-orders"
            className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
            >
            <h2 className="font-medium text-gray-800">📦 Gérer les commandes</h2>
          </Link>
          
          <div className="block p-4 bg-gray-50 rounded-lg opacity-50 cursor-not-allowed">
            <h2 className="font-medium text-gray-500">👤 Gérer les utilisateurs (bientôt disponible)</h2>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/admin/login");
          }}
          className="w-full py-3 px-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;