import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <img
        src={product.imageUrl || "https://via.placeholder.com/300x200?text=Produit"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {product.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-pink-600 font-bold text-md">
            {product.price.toFixed(2)} €
          </span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
