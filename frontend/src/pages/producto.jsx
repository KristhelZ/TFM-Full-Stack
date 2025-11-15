import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx"; 
import "../../css/producto.css";

export default function producto() {
  return (
    <>
     {/* =================== HEADER =================== */}
            <Header/>
            
      <main className="pdp">

      {/* ===== PRODUCTO ===== */}
      <section className="pdp-detail">
        <div className="pdp-detail__media">
          <img
            src="/img/shortboard1.png"
            alt="Gas Pedal"
            className="pdp-detail__image"
          />
        </div>

        <div className="pdp-detail__info">
          <p className="pdp-detail__brand">Timmy Patterson</p>
          <h1 className="pdp-detail__title">Gas Pedal</h1>

          <label htmlFor="pdp-size" className="pdp-detail__label">Size</label>
          <select id="pdp-size" className="pdp-detail__select">
            <option>5'7 x 18.63 x 2.19 x 23.8L</option>
          </select>

          <p className="pdp-detail__price">$755.00</p>

          <Link to="/carrito" className="pdp-detail__cta" role="button">Add to cart</Link>

          <p className="pdp-detail__desc">
            The Gas Pedal shortboard by Timmy Patterson Surfboards is designed
            for high-performance surfing in a variety of wave conditions. Known
            for its versatility and speed...
          </p>
        </div>
      </section>

      {/* ===== PRODUCTOS RELACIONADOS ===== */}
      <section className="related">
        <h2 className="related__heading">Check these boards out!</h2>

        <div className="related__grid">
          <article className="related__card">
            <img src="/img/shortboards11.png" alt="Alton 5'1" className="related__image" />
            <h3 className="related__title">Alton 5’1</h3>
            <p className="related__subtitle">Single Fin</p>
            <p className="related__price">$365.00</p>
          </article>

          <article className="related__card">
            <img src="/img/shortboards12.png" alt="Roger Hinds 5'8" className="related__image" />
            <h3 className="related__title">Roger Hinds 5’8</h3>
            <p className="related__subtitle">SNomad Surfboards</p>
            <p className="related__price">$633.25</p>
          </article>

          <article className="related__card">
            <img src="/img/shortboards13.png" alt="Alton 5'1" className="related__image" />
            <h3 className="related__title">Alton 5’1</h3>
            <p className="related__subtitle">Single Fin</p>
            <p className="related__price">$365.00</p>
          </article>

          {/* Placeholder to keep 4 columns; delete if you add more cards */}
          <div className="related__spacer" aria-hidden="true" />
        </div>
      </section>
    </main>

{/* ======== FOOTER ======== */}
<footer className="footer">
        <div className="footer__contenedor">
          <div className="footer__logo">
            <img src="/img/logo.png" alt="Logo Manu's Surf Shop" className="footer__logo-img" />
          </div>

          <div className="footer__bloque">
            <h3 className="footer__titulo">Shop</h3>
            <ul className="footer__lista">
              <li className="footer__item"><a href="#" className="footer__enlace">Surfboards</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">Accessories</a></li>
              <li className="footer__item"><a href="#" className="footer__enlace">Wetsuits</a></li>
              <li className="footer__item"><a href="#" className="footere__enlace">Clothes</a></li>
            </ul>
          </div>

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

        <div className="footer__legal">
          <p className="footer__texto">© Copyright 2024 Manu’s Surfshop. All rights reserved.</p>
          <a href="#" className="footer__enlace--legal">Cookies and privacy policies.</a>
        </div>
      </footer>
    </>
  );
}