import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
<<<<<<< HEAD
    <div className="home min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <header className="header sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="logo text-2xl font-bold text-pink-600 flex items-center space-x-2 select-none">
            <span aria-label="shopping bag" role="img" className="text-yellow-500 text-3xl">🛍️</span>
=======
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold text-blue-400 flex items-center gap-2">
            <span>🛍️</span>
>>>>>>> fa7ca1009b95d1a2b7ae379e281cebecde0b38b0
            <span>MarketPlace</span>
          </div>
        </nav>
      </header>

<<<<<<< HEAD
      <main className="container mx-auto px-4 py-10">
        <section className="hero text-center mb-16 animate-fade-in-up">
          <h1 className="hero-heading text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Découvrez nos <span className="text-pink-600 gradient-text">produits exclusifs</span>
          </h1>
          <p className="hero-subtitle text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Une sélection de produits tendance, à prix imbattables. Achetez maintenant !
=======
      <main className="max-w-7xl mx-auto px-4 py-10">
        <section className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold mb-4">
            Explorez nos <span className="text-blue-400">produits premium</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Sélection exclusive de produits tech, maison et lifestyle à prix doux. 🚀
>>>>>>> fa7ca1009b95d1a2b7ae379e281cebecde0b38b0
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

<<<<<<< HEAD
        <section id="products" className="products bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nos produits</h2>
=======
        <section className="bg-[#1e293b] rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-white mb-6">Nos produits</h2>
>>>>>>> fa7ca1009b95d1a2b7ae379e281cebecde0b38b0
          <ProductList />
        </section>
      </main>
    </div>
  );
};

export default Home;
