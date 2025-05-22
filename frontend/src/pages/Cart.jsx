import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Votre panier</h2>

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
          <button onClick={clearCart} style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
            Vider le panier
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
