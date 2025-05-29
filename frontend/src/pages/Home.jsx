import React from "react";
import ProductList from "../components/ProductList";
import './Home.css';

const Home = () => {
  return (
    <div className="home min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <header className="header sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="logo text-2xl font-bold text-pink-600 flex items-center space-x-2 select-none">
            <span aria-label="shopping bag" role="img" className="text-yellow-500 text-3xl">🛍️</span>
            <span>MarketPlace</span>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section className="hero text-center mb-16 animate-fade-in-up">
          <h1 className="hero-heading text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Découvrez nos <span className="text-pink-600 gradient-text">produits exclusifs</span>
          </h1>
          <p className="hero-subtitle text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Une sélection de produits tendance, à prix imbattables. Achetez maintenant !
          </p>

          {/* Bouton vers la section produits */}
          <a
            href="#products"
            className="btn-primary inline-block px-6 py-3 rounded-lg font-semibold text-white bg-pink-600 hover:bg-pink-700 transition"
          >
            Voir les produits
          </a>

          {/* Section visuelle stylisée sans image */}
          <div
            className="mx-auto mt-10 w-48 h-48 rounded-full bg-gradient-to-tr from-pink-400 to-yellow-400
                       flex items-center justify-center shadow-lg animate-bounce select-none"
            aria-hidden="true"
            title="Icône produit stylisée"
          >
            <span className="text-white text-6xl">🛒</span>
          </div>
        </section>

        <section id="products" className="products bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nos produits</h2>
          <ProductList />
        </section>
      </main>
    </div>
  );
};

export default Home;
