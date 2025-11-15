import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import "../../css/login.css";


const API_BASE_URL = "http://localhost:3000/";


function decodeJwtPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(
    () => localStorage.getItem("remember_email") || ""
  );
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(
    Boolean(localStorage.getItem("remember_email"))
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const [navOpen, setNavOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  useEffect(() => {
    if (!navOpen) setShopOpen(false);
  }, [navOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const resp = await fetch(`${API_BASE_URL}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = resp.headers.get("content-type") || "";
      const parsed = contentType.includes("application/json")
        ? await resp.json().catch(() => ({}))
        : await resp.text().then((t) => ({ message: t })).catch(() => ({}));

      if (!resp.ok) {
        throw new Error(parsed?.message || "Invalid credentials");
      }

     
      const accessToken = parsed.accessToken || parsed.token;
      const refreshToken = parsed.refreshToken || null;

      if (!accessToken) {
        throw new Error("No access token returned by API");
      }

     
      localStorage.setItem("auth_token", accessToken);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);

      const payload = decodeJwtPayload(accessToken) || {};
      console.log ("accesstoken",accessToken);
      console.log ("payload",payload);
    
      const roleFromToken = payload.role;
     
     
      const userObj =
        parsed.user ||
        {
          id: payload.id || null,
          email: payload.email || email,
          role: roleFromToken || "user",
        };
        console.log("userObj",userObj)
      localStorage.setItem("auth_user", JSON.stringify(userObj));

     
      if (remember) localStorage.setItem("remember_email", email);
      else localStorage.removeItem("remember_email");

    
      if ((userObj.role || roleFromToken) == "admin") {
        navigate("/admin");
      } else {
        navigate("/cuenta");
      }
    } catch (err) {
      setErrorMsg(err?.message || "invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =================== HEADER =================== */}
      <Header />

      {/* =================== LOGIN =================== */}
      <main className="login">
        <section className="login__contenedor">
          <div className="login__icono">
            <img src="/img/User.png" alt="Icono usuario" />
          </div>
          <h2 className="login__titulo">Log in</h2>

          
            <p className="loginFail"
              role="alert"
              style={{
                color: "crimson",
                textAlign: "center",
                marginBottom: "0.75rem",
              }}
            >
              {errorMsg}
            </p>
         

          <form className="login__formulario" onSubmit={handleSubmit}>
            <div className="login__campo">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="login__campo">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <div className="login__opciones">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />{" "}
                Remember me
              </label>
              <a href="#" className="login__enlace">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login__boton" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="login__registro">
              Not registered?{" "}
              <a href="#" className="login__enlace">
                Create an account!
              </a>
            </p>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__contenedor">
          <div className="footer__logo">
            <img
              src="/img/logo.png"
              alt="Logo Manu's Surf Shop"
              className="footer__logo-img"
            />
          </div>
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
