import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import "../../css/admin.css";



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

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:3000";


async function apiGetProducts() {
  const res = await fetch(`${API_BASE_URL}api/products`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error loading products");
  return res.json();
}

async function apiCreateProduct(token, payload) {
  const res = await fetch(`${API_BASE_URL}api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Error creating product");
  }
  return res.json();
}

async function apiUpdateProduct(token, id, payload) {
  const res = await fetch(`${API_BASE_URL}api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Error updating product");
  }
  return res.json();
}

async function apiDeleteProduct(token, id) {
  const res = await fetch(`${API_BASE_URL}api/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Error deleting product");
  }
  return res.json();
}




function ProductsTable({ items, loading, q, setQ, onCreateClick, onEdit, onDelete }) {
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((p) => {
      const name = (p?.name || "").toLowerCase();
      const brand = (p?.brand || "").toLowerCase();
      const category = (p?.category || "").toLowerCase();
      return name.includes(term) || brand.includes(term) || category.includes(term);
    });
  }, [items, q]);

  return (
    <section className="admin__section">
      <div className="admin__toolbar">
        <input
          className="admin__search"
          placeholder="Search by name, brand or category"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="admin__btn admin__btn--primary" onClick={onCreateClick}>
          + New product
        </button>
      </div>

      <div className="admin__table-wrapper">
        <table className="admin__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Active</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="admin__empty">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} className="admin__empty">No products</td></tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td className="admin__img-cell">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} />
                    ) : (
                      <div style={{
                        width: 64, height: 64, border: "1px solid #e5e7eb",
                        borderRadius: 8, display: "grid", placeItems: "center", color: "#9ca3af", fontSize: 12
                      }}>
                        No image
                      </div>
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.brand || "-"}</td>
                  <td>{p.category || "-"}</td>
                  <td>${Number(p.price || 0).toFixed(2)}</td>
                  <td>{p.stock ?? 0}</td>
                  <td>{p.active ? "Yes" : "No"}</td>
                  <td>
                    <div className="admin__actions">
                      <button className="admin__btn" onClick={() => onEdit(p)}>Edit</button>
                      <button className="admin__btn admin__btn--danger" onClick={() => onDelete(p)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}


function ProductForm({ open, initial, onClose, onSubmit }) {
  const [form, setForm] = useState(() => ({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
    image_url: "",
    active: true,
  }));
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setErr("");
      setForm({
        name: initial?.name || "",
        brand: initial?.brand || "",
        category: initial?.category || "",
        description: initial?.description || "",
        price: Number(initial?.price ?? 0),
        stock: Number(initial?.stock ?? 0),
        image_url: initial?.image_url || "",
        active: Boolean(initial?.active ?? true),
      });
    }
  }, [open, initial]);

  if (!open) return null;

  const submit = () => {
    setErr("");
    if (!form.name.trim()) return setErr("Name is required");
    if (form.price < 0) return setErr("Price cannot be negative");
    if (form.stock < 0) return setErr("Stock cannot be negative");
    onSubmit(form);
  };

  const bind = (k) => ({
    value: form[k],
    onChange: (e) => setForm((s) => ({ ...s, [k]: e.target.value })),
  });

  return (
    <div className="admin__modal" role="dialog" aria-modal="true">
      <div className="admin__modal-card">
        <h3 className="admin__modal-title">{initial ? "Edit product" : "New product"}</h3>
        {err && <p className="admin__modal-message" style={{ color: "crimson" }}>{err}</p>}

        <div className="admin__form">
          <div className="admin__grid">
            <div className="admin__field">
              <span>Name</span>
              <input type="text" placeholder="Name" {...bind("name")} />
            </div>
            <div className="admin__field">
              <span>Brand</span>
              <input type="text" placeholder="Brand" {...bind("brand")} />
            </div>
            <div className="admin__field">
              <span>Category</span>
              <input type="text" placeholder="Category" {...bind("category")} />
            </div>
            <div className="admin__field">
              <span>Price</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={(e) => setForm((s) => ({ ...s, price: Number(e.target.value) }))}
              />
            </div>
            <div className="admin__field">
              <span>Stock</span>
              <input
                type="number"
                placeholder="0"
                value={form.stock}
                onChange={(e) => setForm((s) => ({ ...s, stock: Number(e.target.value) }))}
              />
            </div>
            <div className="admin__field admin__field--full">
              <span>Image URL</span>
              <input type="url" placeholder="https://..." {...bind("image_url")} />
            </div>
            <div className="admin__field admin__field--full">
              <span>Description</span>
              <textarea rows={4} placeholder="Description" {...bind("description")} />
            </div>
            <div className="admin__field">
              <span>Active</span>
              <label style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
                <input
                  type="checkbox"
                  checked={!!form.active}
                  onChange={(e) => setForm((s) => ({ ...s, active: e.target.checked }))}
                />
                <span>{form.active ? "Yes" : "No"}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="admin__modal-actions">
          <button className="admin__btn" onClick={onClose}>Cancel</button>
          <button className="admin__btn admin__btn--primary" onClick={submit}>
            {initial ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>
    </div>
  );
}


function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="admin__modal" role="dialog" aria-modal="true">
      <div className="admin__modal-card">
        <h3 className="admin__modal-title">{title || "Confirm"}</h3>
        {message && <p className="admin__modal-message">{message}</p>}
        <div className="admin__modal-actions">
          <button className="admin__btn" onClick={onCancel}>Cancel</button>
          <button className="admin__btn admin__btn--danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}


export default function Admin() {
  const navigate = useNavigate();


  const token = useMemo(() => localStorage.getItem("auth_token") || "", []);
  const authUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("auth_user") || "null"); }
    catch { return null; }
  }, []);
  const role = useMemo(() => {
    if (authUser?.role) return authUser.role;
    const payload = token ? decodeJwtPayload(token) : null;
    return payload?.role || null;
  }, [authUser, token]);

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
    else if (role !== "admin") navigate("/cuenta", { replace: true });
  }, [token, role, navigate]);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await apiGetProducts();
        if (mounted) setItems(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

 
  async function createProduct(payload) {
    const created = await apiCreateProduct(token, payload);
 
    setItems((prev) => [ ...(Array.isArray(prev) ? prev : []), created ]);
  }
  async function updateProduct(id, payload) {
    await apiUpdateProduct(token, id, payload);
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...payload } : p)));
  }
  async function deleteProduct(id) {
    await apiDeleteProduct(token, id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  }


  function openCreate() { setEditing(null); setFormOpen(true); }
  function openEdit(product) { setEditing(product); setFormOpen(true); }
  function closeForm() { setFormOpen(false); setEditing(null); }

  async function handleSubmit(payload) {
    if (editing) await updateProduct(editing.id, payload);
    else await createProduct(payload);
    closeForm();
  }

  return (
    <>
      {/* =================== HEADER =================== */}
      <Header />

      {/* Hero */}
      <section className="admin__hero">
        <div className="admin__hero-inner">
          <h1 className="admin__title">Administrative Platform</h1>
          <p className="admin__subtitle">Product Management</p>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="admin__container">
        {/* KPIs */}
        <section className="admin__stats">
          <div className="admin__stat">
            <span className="admin__stat-kpi">{items.length}</span>
            <span className="admin__stat-label">Products loaded</span>
          </div>
          <div className="admin__stat">
            <span className="admin__stat-kpi">
              {items.filter((i) => (i?.stock ?? 0) <= 0).length}
            </span>
            <span className="admin__stat-label">Out of stock</span>
          </div>
          <div className="admin__stat">
            <span className="admin__stat-kpi">
              $
              {items
                .reduce((sum, p) => sum + Number(p.price || 0) * Number(p.stock || 0), 0)
                .toFixed(2)}
            </span>
            <span className="admin__stat-label">Inventory value</span>
          </div>
        </section>

        {/* Tabla + acciones */}
        <ProductsTable
          items={items}
          loading={loading}
          q={q}
          setQ={setQ}
          onCreateClick={openCreate}
          onEdit={openEdit}
          onDelete={setToDelete}
        />
      </main>

      {/* Modal crear/editar */}
      <ProductForm
        open={formOpen}
        initial={editing}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      {/* Modal confirmar borrado */}
      <ConfirmDialog
        open={!!toDelete}
        title="Delete product"
        message={toDelete ? `Delete “${toDelete.name}”? This cannot be undone.` : ""}
        onCancel={() => setToDelete(null)}
        onConfirm={async () => {
          await deleteProduct(toDelete.id);
          setToDelete(null);
        }}
      />

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
