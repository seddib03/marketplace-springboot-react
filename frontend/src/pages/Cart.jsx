import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../services/api";
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
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        totalPrice: total,
      };

      await placeOrder(orderData);
      alert("Commande passée avec succès !");
      clearCart();
    } catch (error) {
      console.error("Erreur de commande :", error);
      alert("Erreur lors du passage de la commande");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        🛒 Votre panier
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-4">
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} index={index} />
            ))}
          </ul>

          <h3 className="text-xl font-bold text-right mb-6">
            Total : {total.toFixed(2)} €
          </h3>

          <div className="flex flex-wrap justify-end gap-4">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
            >
              ✅ Passer la commande
            </button>

            <button
              onClick={clearCart}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
            >
              ❌ Vider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
