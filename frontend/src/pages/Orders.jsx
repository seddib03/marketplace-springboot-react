import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      try {
        const data = await getOrdersByUser(user.id);
        setOrders(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Chargement des commandes...</p>;

  if (orders.length === 0) return <p>Aucune commande trouvée.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Historique des commandes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc" }}>
            <p><strong>Commande n°:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> {order.totalPrice.toFixed(2)} €</p>
            <p><strong>Produits :</strong></p>
            <ul>
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.productName} - Quantité: {item.quantity} - Prix: {item.price.toFixed(2)} €
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
