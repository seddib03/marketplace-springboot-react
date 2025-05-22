import React from "react";

import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col 
      bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100
      animate-gradientBackground
      ">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-300 shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-pink-700 tracking-wide cursor-pointer select-none flex items-center gap-2">
            <span className="text-yellow-500 animate-pulse">🌸</span> MarketPlace
          </div>

          {/* Tu peux ajouter des liens ici */}
          
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <section
          id="about"
          className="max-w-6xl mx-auto text-center my-20 px-6 py-16 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-200"
        >
          <h1 className="text-6xl font-extrabold text-pink-700 mb-6 tracking-wide drop-shadow-lg">
            Bienvenue sur{" "}
            <span className="text-yellow-500 bg-pink-100 px-4 py-2 rounded-xl shadow-lg inline-block">
              la Marketplace
            </span>
          </h1>
          <p className="text-2xl text-pink-900 max-w-4xl mx-auto leading-relaxed">
            Explorez nos produits exclusifs, profitez d'offres incroyables et achetez en toute simplicité.
          </p>
        </section>

        <section
          id="products"
          className="max-w-7xl mx-auto bg-white rounded-3xl p-10 shadow-3xl border border-pink-300 mb-32"
        >
          <ProductList />
        </section>
      </main>
    </div>
  );
};

export default Home;
