// src/App.js
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
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly> <AdminDashboard /></ProtectedRoute>}/>
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/register" element={<Inscription />} />
          <Route path="/CartContext" element={<CartProvider />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
