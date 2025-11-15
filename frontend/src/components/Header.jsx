import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/header.css"; 

export default function header() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [navOpen, setNavOpen] = useState(false);     
  const [shopOpen, setShopOpen] = useState(false);    
  const [arrowUp, setArrowUp] = useState(false);     
  const hideTimeoutRef = useRef(null);               

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);


      if (!mobile) {
        setNavOpen(false);
        setShopOpen(false);
        setArrowUp(false);
      } else {
        setShopOpen(false);
        setArrowUp(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

 
  const arrow = arrowUp ? "△" : "▽";

  const onShopToggleClick = (e) => {
    e.preventDefault();
    setArrowUp((v) => !v);
    setShopOpen((v) => !v);
  };

  const onShopEnter = () => {
    if (isMobile) return;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setShopOpen(true);
  };

  
  const onShopLeave = () => {
    if (isMobile) return;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setShopOpen(false);
      setArrowUp(false);
    }, 300);
  };

  const onBackClick = (e) => {
    e.preventDefault();
    setShopOpen(false);
    setArrowUp(false);
  };

  return (
    <header className="header">
      {/* IZQUIERDA */}
      <div className="header__left">
        <nav
          className={`header__nav ${
            isMobile ? (navOpen ? "active" : "header__nav--hidden") : ""
          }`}
        >
          <ul className="header__nav-list">
            {/* ITEM: SHOP con submenu */}
            <li
              className={`header__nav-item ${shopOpen ? "active" : ""}`}
              onMouseEnter={onShopEnter}
              onMouseLeave={onShopLeave}
            >
              <a
                href="#"
                id="shop-toggle"
                className="header__nav-link"
                onClick={onShopToggleClick}
              >
                Shop {arrow}
              </a>

              <ul
                id="submenu"
                className="submenu"
                style={{ display: isMobile ? (shopOpen ? "block" : "none") : undefined }}
                onMouseEnter={onShopEnter}
                onMouseLeave={onShopLeave}
              >
                {/* Back solo en móvil */}
                {isMobile && shopOpen && (
                  <li className="submenu__back">
                    <a href="#" className="submenu__link" onClick={onBackClick}>
                      ⬅ Back
                    </a>
                  </li>
                )}

                <li>
                  <Link to="/producto" className="submenu__link">
                    Surfboards
                  </Link>
                </li>
                <li><a href="#" className="submenu__link">Accessories</a></li>
                <li><a href="#" className="submenu__link">Wetsuits</a></li>
                <li><a href="#" className="submenu__link">Clothes</a></li>
              </ul>
            </li>

            {/* Resto de items: en móvil se ocultan*/}
            <li
              className="header__nav-item"
              style={{ display: isMobile && shopOpen ? "none" : undefined }}
            >
              <a href="#" className="header__nav-link">News</a>
            </li>
            <li
              className="header__nav-item"
              style={{ display: isMobile && shopOpen ? "none" : undefined }}
            >
              <a href="#" className="header__nav-link">About</a>
            </li>
            <li
              className="header__nav-item"
              style={{ display: isMobile && shopOpen ? "none" : undefined }}
            >
              <a href="#" className="header__nav-link">Contact</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* CENTRO: Logo */}
      <div className="header__center">
        <Link to="/" className="header__logo">
          <img className="logo" src="/img/logo.png" alt="Manu's Surf Shop" />
        </Link>
      </div>

      {/* DERECHA: Iconos */}
      <div className="header__right">
        <div className="header__icons">
          <a href="#"><img src="/img/Search.png" alt="Search" /></a>
          <Link to="/login"><img src="/img/User.png" alt="User" /></Link>
          <a href="#"><img src="/img/Cart.png" alt="Cart" /></a>
        </div>
        <div className="burger-container">
          <button
            className="burger-menu"
            id="burger-button"
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-expanded={navOpen}
            aria-controls="submenu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}