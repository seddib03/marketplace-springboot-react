// src/pages/Home.jsx
import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold text-blue-400 flex items-center gap-2">
            <span>🛍️</span>
            <span>MarketPlace</span>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <section className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold mb-4">
            Explorez nos <span className="text-blue-400">produits premium</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Sélection exclusive de produits tech, maison et lifestyle à prix doux. 🚀
          </p>
        </section>

        <section className="bg-[#1e293b] rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-white mb-6">Nos produits</h2>
          <ProductList />
        </section>
      </main>
    </div>
  );
};

export default Home;
