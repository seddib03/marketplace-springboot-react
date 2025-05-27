import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.token || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/admin/login");
    } else {
      fetchOrders();
    }
  }, [navigate, user]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8083/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(`Erreur lors de la récupération des commandes : ${error.message}`);
      console.error("Détails de l'erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8083/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const updatedOrder = await response.json();
      setOrders(orders.map(order => order.id === orderId ? updatedOrder : order));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  if (loading) return <p>Chargement des commandes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gérer les commandes</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
            <p><strong>Commande n°:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Statut:</strong> 
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="ml-2 p-1 border rounded"
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
              </select>
            </p>
            <p><strong>Utilisateur:</strong> {order.user?.username}</p>
            <ul>
              {order.orderItems?.map((item) => (
                <li key={item.id}>
                  {item.product?.name} - Quantité: {item.quantity} - Prix: {item.price.toFixed(2)} €
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;