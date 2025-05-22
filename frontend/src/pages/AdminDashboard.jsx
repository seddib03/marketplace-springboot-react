import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Utilisateur récupéré depuis le localStorage :", user);

    if (!user || !Array.isArray(user.roles) || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Bienvenue dans le panneau d'administration</h1>
      <p className="mb-6 text-gray-600 text-lg">Choisissez une action :</p>

      <ul className="space-y-4">
        <li>
          <Link
            to="/admin/add-product"
            className="block text-blue-600 hover:text-blue-800 font-semibold text-lg transition"
          >
            ➕ Ajouter un produit
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className="block text-blue-600 hover:text-blue-800 font-semibold text-lg transition"
          >
            📦 Gérer les commandes (à venir)
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="block text-blue-600 hover:text-blue-800 font-semibold text-lg transition"
          >
            👤 Gérer les utilisateurs (à venir)
          </Link>
        </li>
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/admin/login");
        }}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md font-semibold transition"
      >
        🔓 Déconnexion
      </button>
    </div>
  );
};

export default AdminDashboard;
