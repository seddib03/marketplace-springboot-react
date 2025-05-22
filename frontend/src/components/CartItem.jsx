import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item, index }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <li style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
      <strong>{item.name}</strong> - {item.price.toFixed(2)} €
      <br />
      <small>{item.description}</small>
      <br />
      <button onClick={() => removeFromCart(index)} style={{ marginTop: "5px" }}>
        Supprimer
      </button>
    </li>
  );
};

export default CartItem;
