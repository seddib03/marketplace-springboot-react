import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import AdminLogin from "./pages/AdminLogin";
import Inscription from "./pages/Inscription";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductList from "./components/ProductList";
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider> {/* Fournit le contexte du panier à toute l'application */}
      <Router> {/* Un seul Router ici */}
        <Navbar />
        <div style={{ marginTop: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Inscription />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/add-product" element={<AddProduct />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
