import React from "react";

const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Votre panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd" }}>
              <h4>{item.name}</h4>
              <p>{item.price} €</p>
            </div>
          ))}
          <h3>Total : {total} €</h3>
          <button>Passer commande</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
