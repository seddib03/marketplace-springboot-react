import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../services/api"; // Assure-toi que ce fichier existe
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Veuillez vous connecter pour passer une commande.");
      return;
    }

    try {
      const orderData = {
        userId: user.id,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        totalPrice: total,
      };

      await placeOrder(orderData); // <- Envoie la commande
      alert("Commande passée avec succès !");
      clearCart(); // <- Vide le panier seulement si ça a marché
    } catch (error) {
      console.error("Erreur de commande :", error);
      alert("Erreur lors du passage de la commande");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒Votre panier</h2>

      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul style={{ padding: 0 }}>
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} index={index} />
            ))}
          </ul>

          <h3>Total : {total.toFixed(2)} €</h3>

          <button
            onClick={handlePlaceOrder}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              marginRight: "10px",
            }}
          >
            ✅Passer la commande
          </button>

          <button
            onClick={clearCart}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
            }}
          >
           ❌ Vider le panier
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
