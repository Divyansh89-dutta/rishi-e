import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}
