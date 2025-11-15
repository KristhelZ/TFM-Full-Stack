import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx"; 
import "../../css/cuenta.css";

export default function Cuenta() {
  return (
    <>
      {/* =================== HEADER =================== */}
            <Header/>

      {/* =================== SECCIÓN MI CUENTA =================== */}
      <main className="cuenta">
        <section className="cuenta__contenedor">
          <h1 className="cuenta__titulo">My Account</h1>

          {/* Opciones */}
          <section className="cuenta__opciones">
            {/* Historial de compras */}
            <div className="cuenta__opcion">
              <h2 className="cuenta__opcion-titulo">Purchase history</h2>
              <p className="cuenta__opcion-texto">Check your former order and detailed information.</p>
            </div>

            {/* Seguimiento de pedido */}
            <div className="cuenta__opcion">
              <h2 className="cuenta__opcion-titulo">Order follow-up</h2>
              <p className="cuenta__opcion-texto">Check the state of your orders</p>
            </div>

            {/* Favoritos */}
            <div className="cuenta__opcion">
              <h2 className="cuenta__opcion-titulo">Favorites</h2>
              <p className="cuenta__opcion-texto">Here you can see al the products you have saved.</p>
            </div>

            {/* Newsletter */}
            <div className="cuenta__opcion">
              <h2 className="cuenta__opcion-titulo">Newsletter</h2>
              <p className="cuenta__opcion-texto">Manage your subscription to our newsletter.</p>
            </div>

            {/* Descuentos */}
            <div className="cuenta__opcion">
              <h2 className="cuenta__opcion-titulo">Discounts</h2>
              <p className="cuenta__opcion-texto">Access your current discounts and special sales.</p>
            </div>
          </section>
        </section>
      </main>

      {/* ======== FOOTER ======== */}
      <footer className="footer">
        <div className="footer__contenedor">
          {/* Logo */}
          <div className="footer__logo">
            <img src="/img/logo.png" alt="Logo Manu's Surf Shop" className="footer__logo-img" />
          </div>

          {/* Menú Shop */}
          <div className="footer__bloque">
            <h3 className="footer__titulo">Shop</h3>
            <ul className="footer__lista">
              <li className="footer__item"><a href="#" className="footer__enlace">Surfboards</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">Accessories</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">Wetsuits</a></li>
              <li className="footer__item"><a href="#" className="footere__enlace">Clothes</a></li>
            </ul>
          </div>

          {/* Menú Company */}
          <div className="footer__bloque">
            <h3 className="footer__titulo">Company</h3>
            <ul className="footer__lista">
              <li className="footer__item"><a href="#" className="footer__enlace">News</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">Team Riders</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">About</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">Contact</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">Warranty</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">Shipping & Returns</a></li>
            </ul>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="footer__legal">
          <p className="footer__texto">© Copyright 2024 Manu’s Surfshop. All rights reserved.</p>
          <a href="#" className="footer__enlace--legal">Cookies and privacy policies.</a>
        </div>
      </footer>
    </>
  );
}
