import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx"; 
import "../../css/style.css";

export default function Index() {
  return (
    <>
       {/* =================== HEADER =================== */}
       <Header/>

      {/* =================== HERO =================== */}
      <section className="hero">
        <div className="hero__background-wrapper">
          <img src="/img/hero.jpg" className="hero__background" alt="Surf hero" />
        </div>
        <div className="hero__text">
          <span className="hero__line">The shop that you</span>
          <span className="hero__line">were looking for</span>
          <p className="hero__subtitle">Surfboards made with the highest quality and comfort</p>
        </div>
      </section>

      {/* Banner */}
      <section className="quote">
        <div className="quote__text-container">
          <p className="quote__text">
            Bringing you closer to what binds us together,{" "}
            <span className="quote__highlight">the sea.</span>
          </p>
        </div>
        <div className="quote__image-container">
          <img src="/img/banner.jpg" alt="Surfer at sunset" className="quote__image" />
        </div>
      </section>

      {/* =================== CATEGORIAS =================== */}
      <section className="category-grid">
        {/* COLUMNA IZQUIERDA */}
        <div className="category-grid__column category-grid__column--left">
          <div className="category-grid__item category-grid__item--full">
            <img src="/img/surfboards.jpg" alt="Surfboards" className="category-grid__image" />
            <span className="category-grid__label">Surfboards</span>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="category-grid__column category-grid__column--right">
          <div className="category-grid__item">
            <img src="/img/accesories.png" alt="Accessories" className="category-grid__image" />
            <span className="category-grid__label">Accessories</span>
          </div>

          <div className="category-grid__item">
            <img src="/img/wetsuits.jpg" alt="Wetsuits" className="category-grid__image" />
            <span className="category-grid__label">Wetsuits</span>
          </div>

          <div className="category-grid__item">
            <img src="/img/clothes.png" alt="Clothes" className="category-grid__image" />
            <span className="category-grid__label">Clothes</span>
          </div>
        </div>
      </section>

      {/* =================== PRODUCTOS =================== */}
      <section className="nuevos-ingresos__contenedor">
        <div className="producto">
          <img src="/img/softboard1.png" alt="Stewart 10’" className="producto__imagen" />
          <h3 className="producto__titulo">Stewart 10’</h3>
          <p className="producto__descripcion">Hydrocrush Clydesdale</p>
          <p className="producto__precio">$760.34</p>
        </div>

        <div className="producto">
          <img src="/img/longboard1.png" alt="Roger Hinds 5’9" className="producto__imagen" />
          <h3 className="producto__titulo">Roger Hinds 5’9</h3>
          <p className="producto__descripcion">Dream Fish</p>
          <p className="producto__precio">$735.00</p>
        </div>

        <div className="producto">
          <img src="/img/longboard4.png" alt="Timmy Patterson 5’5" className="producto__imagen" />
          <h3 className="producto__titulo">Timmy Patterson 5’5</h3>
          <p className="producto__descripcion">Gas Pedal</p>
          <p className="producto__precio">$755.00</p>
        </div>

        <div className="producto">
          <img src="/img/longboard1.png" alt="AIPA 9’0" className="producto__imagen" />
          <h3 className="producto__titulo">AIPA 9’0</h3>
          <p className="producto__descripcion">String Surfboard</p>
          <p className="producto__precio">$1,140</p>
        </div>
      </section>

      {/* Nosotros */}
      <section className="nosotros">
        <div className="nosotros__contenido">
          <h2 className="nosotros__titulo">About Us</h2>
          <p className="nosotros__texto">
            We’re more than just a surf shop—we’re a vibrant part of California’s surfing community.
            Founded by passionate surfers, our mission is to provide top-quality surfboards, wetsuits,
            and apparel that elevate your surfing experience. Whether you’re just starting out or
            you’re a seasoned pro, our products are designed to meet the needs of every surfer, helping
            you ride the waves with confidence and style.
          </p>
          <p className="nosotros__texto">
            We believe that surfing is more than just a sport; it’s a way of life that connects people
            to the ocean and to each other. That’s why we focus on offering gear that not only performs
            well but also reflects the spirit of the surfing lifestyle. Our collection is carefully
            curated to cater to both men and women, ensuring that everyone can find something that
            suits their style and needs. We’re dedicated to fostering a community where everyone feels
            welcome, whether you’re hitting the waves at sunrise or enjoying a sunset on the shore.
          </p>
        </div>
        <div className="nosotros__imagen">
          <img src="/img/surfers.jpg" alt="Surfistas en la playa" />
        </div>
      </section>

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
