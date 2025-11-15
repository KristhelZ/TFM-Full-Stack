import React, { useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import "../../css/carrito.css";

import {
  getToken,
  getAuthUser,
  readCartItems,
  buildFallbackItems,
  formatCurrency,
} from "../hooks/cart";


const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "";

/**
 *
 * @param {{ token: string, body: { name: string, address: string, items: Array<{productId:number, quantity:number}> } }} params
 * @returns {Promise<any>} 
 */
async function placeOrderFetch({ token, body }) {
  const resp = await fetch(`${API_BASE_URL}api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  
  if (!resp.ok) {
    let detail = "";
    try {
      const data = await resp.json();
      detail = data?.message || "";
    } catch (_) {
     
    }
    const msg = detail || `Order failed (HTTP ${resp.status})`;
    throw new Error(msg);
  }


  return resp.json();
}

export default function Carrito() {
  const unitPrice = 755.0;
  const defaultProductId = 1;

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [placing, setPlacing] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const user = useMemo(() => getAuthUser(), []);
  const token = useMemo(() => getToken(), []);

  const subtotal = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);
  const shipping = 0;
  const total = subtotal + shipping;

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => q + 1);

  const handlePlaceOrder = async () => {
    setMsg("");
    setErr("");

    try {
      if (!token) throw new Error(" Please login to place your order.");
      if (!name.trim() || !address.trim()) {
        throw new Error("Fill in your name and address.");
      }

     
      const items =
        readCartItems() ?? buildFallbackItems(defaultProductId, quantity);

      const body = {
        name: name.trim(),
        address: address.trim(),
        items,
      };

      setPlacing(true);

   
      const data = await placeOrderFetch({ token, body });

      setMsg(
        `¡Order #${data.id} sent! Total: ${formatCurrency(
          typeof data.total === "number" ? data.total : total
        )}`
      );
    } catch (e) {
      setErr(e.message || "Error in finalizing your order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      {/* =================== HEADER =================== */}
      <Header />

      {/* =================== SECCIÓN CARRITO =================== */}
      <main className="carrito">
        <h1 className="carrito__titulo">Shopping Cart</h1>

        <section className="carrito__contenido">
          {/* Columna izquierda: producto */}
          <div className="carrito__producto">
            <button className="carrito__check">&#x2713;</button>

            <img
              src="/img/shortboard1.png"
              alt="Tabla de surf"
              className="carrito__imagen"
            />

            <div className="carrito__info">
              <p className="carrito__marca">Timmy Patterson</p>
              <p className="carrito__modelo">Gas Pedal</p>
              <p className="carrito__medidas">5'7 x 18.63 x 2.19 x 23.8L</p>
            </div>

            <div className="carrito__cantidad">
              <button onClick={dec} aria-label="Decrementar">
                -
              </button>
              <span>{quantity}</span>
              <button onClick={inc} aria-label="Incrementar">
                +
              </button>
            </div>

            <p className="carrito__precio">{formatCurrency(subtotal)}</p>
          </div>

          {/* Columna derecha: resumen */}
          <div className="carrito__resumen">
            <div className="carrito__resumen-producto">
              <img
                src="/img/shortboard1.png"
                alt="Gas Pedal"
                className="carrito__resumen-img"
              />
              <div>
                <p className="carrito__marca">Timmy Patterson</p>
                <p className="carrito__modelo">Gas Pedal</p>
                <p className="carrito__medidas">5'7 x 18.63 x 2.19 x 23.8L</p>
              </div>
              <p className="carrito__precio">{formatCurrency(subtotal)}</p>
            </div>

            {/* Descuento (visual) */}
            <div className="carrito__descuento">
              <label htmlFor="codigo">¿Do you have a discount code?</label>
              <div className="carrito__codigo">
                <input type="text" id="codigo" placeholder="Discount Code" />
                <button>Apply</button>
              </div>
            </div>

            {/* Formulario de envío */}
            <div className="carrito__form">
              <label htmlFor="name" className="carrito__label">
                Name
              </label>
              <input
                id="name"
                className="carrito__input"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />

              <label htmlFor="address" className="carrito__label">
                Address
              </label>
              <input
                id="address"
                className="carrito__input"
                type="text"
                placeholder="Shipping address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="street-address"
              />
            </div>

            <div className="carrito__total">
              <p>
                Subtotal <span>{formatCurrency(subtotal)}</span>
              </p>
              <p>
                Shipping <span>{formatCurrency(shipping)}</span>
              </p>
              <p>
                Total <span>{formatCurrency(total)}</span>
              </p>
            </div>

            {/* Mensajes */}
            {msg && <p className="carrito__ok">{msg}</p>}
            {err && <p className="carrito__error">{err}</p>}

            <button
              className="carrito__boton"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? "Placing..." : "Place Order"}
            </button>
          </div>
        </section>
      </main>

      {/* ======== FOOTER ======== */}
      <footer className="footer">
        <div className="footer__contenedor">
          {/* Logo */}
          <div className="footer__logo">
            <img
              src="/img/logo.png"
              alt="Logo Manu's Surf Shop"
              className="footer__logo-img"
            />
          </div>

          {/* Menú Shop */}
          <div className="footer__bloque">
            <h3 className="footer__titulo">Shop</h3>
            <ul className="footer__lista">
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  Surfboards
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  Accessories
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  Wetsuits
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footere__enlace">
                  Clothes
                </a>
              </li>
            </ul>
          </div>

          {/* Menú Company */}
          <div className="footer__bloque">
            <h3 className="footer__titulo">Company</h3>
            <ul className="footer__lista">
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  News
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  Team Riders
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  About
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  Contact
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  Warranty
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__enlace">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="footer__legal">
          <p className="footer__texto">
            © Copyright 2024 Manu’s Surfshop. All rights reserved.
          </p>
          <a href="#" className="footer__enlace--legal">
            Cookies and privacy policies.
          </a>
        </div>
      </footer>
    </>
  );
}
