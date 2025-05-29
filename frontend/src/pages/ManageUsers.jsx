import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageUsers.css";

import {
  getUsers,
  createUser,
  updateUserRoles,
  deleteUser,
} from "../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    roles: ["ROLE_USER"],
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.token || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/login");
    } else {
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await getUsers();
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        setError("La réponse de l'API n'est pas une liste valide d'utilisateurs.");
        console.error("Réponse inattendue :", usersData);
      }
    } catch (error) {
      setError(`Erreur lors de la récupération des utilisateurs : ${error.message}`);
      console.error("Détails de l'erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRoles = async (userId, newRoles) => {
    try {
      const updatedUser = await updateUserRoles(userId, newRoles);
      setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
      setSuccess("Rôles mis à jour avec succès !");
    } catch (error) {
      setError(`Erreur lors de la mise à jour des rôles : ${error.message}`);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      setSuccess("Utilisateur supprimé avec succès !");
    } catch (error) {
      setError(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
    }
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewUser = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({ username: "", email: "", password: "", roles: ["ROLE_USER"] });
      setSuccess("Utilisateur ajouté avec succès !");
    } catch (error) {
      setError(`Erreur lors de la création de l'utilisateur : ${error.message}`);
    }
  };

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="manage-users-container">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gérer les utilisateurs</h1>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un utilisateur</h2>
        <form onSubmit={handleAddNewUser} className="add-user-form">

          <div>
            <label className="block text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleNewUserChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleNewUserChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleNewUserChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Rôles</label>
            <select
              multiple
              name="roles"
              value={newUser.roles}
              onChange={(e) => {
                const selectedRoles = Array.from(e.target.selectedOptions).map(option => option.value);
                setNewUser(prev => ({ ...prev, roles: selectedRoles }));
              }}
              className="w-full p-2 border rounded"
            >
              <option value="ROLE_USER">ROLE_USER</option>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ajouter l'utilisateur
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="user-card">

            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nom d'utilisateur:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Rôles:</strong> 
              <select
                multiple
                value={user.roles || []}
                onChange={(e) => {
                  const selectedRoles = Array.from(e.target.selectedOptions).map(option => option.value);
                  handleUpdateUserRoles(user.id, selectedRoles);
                }}
                className="ml-2 p-1 border rounded"
              >
                <option value="ROLE_USER">ROLE_USER</option>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              </select>
            </p>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="mt-2 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;


