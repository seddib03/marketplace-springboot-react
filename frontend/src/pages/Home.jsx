import React from "react";
import ProductList from "../components/ProductList";
import './Home.css';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header élégant et simple */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-pink-600 flex items-center space-x-2">
            <span className="text-yellow-500">🛍️</span>
            <span>MarketPlace</span>
          </div>
        </nav>
      </header>

      {/* Contenu principal avec espacement amélioré */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section hero avec animation subtile */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Découvrez nos <span className="text-pink-600">produits exclusifs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une sélection soignée pour vos besoins. Qualité, style et prix imbattables.
          </p>
        </section>

        {/* Section produits avec fond propre */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Nos produits</h2>
          <ProductList />
        </section>
      </main>
    </div>
  );
};

export default Home;