import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../css/style.css";

import Index from "./pages/index.jsx";
import Login from "./pages/login.jsx";
import Cuenta from "./pages/cuenta.jsx";
import Producto from "./pages/producto.jsx";
import Carrito from "./pages/carrito.jsx";
import Admin from "./pages/admin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


function Boot() {
  useEffect(() => {
    const apiBase =
      (import.meta?.env?.VITE_API_BASE_URL ??
       import.meta?.env?.VITE_API_URL ??
       "");
   
    window.__API_BASE_URL__ = apiBase;
   
    if (import.meta.env.DEV) {
      console.info("[API] Base URL:", apiBase || "(usando proxy de Vite)");
    }
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Boot />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/cuenta"
          element={
            <ProtectedRoute>
              <Cuenta />
            </ProtectedRoute>
          }
        />

        <Route path="/producto" element={<Producto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<Admin />} />
      


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
