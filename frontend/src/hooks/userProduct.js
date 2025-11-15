import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../services/api";

export default function useProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet("/products"); 
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.brand?.toLowerCase().includes(s) ||
        p.category?.toLowerCase().includes(s)
    );
  }, [items, q]);

  async function createProduct(payload) {
    const created = await apiPost("/products", payload);
    setItems((arr) => [created, ...arr]);
  }

  async function updateProduct(id, payload) {
    const updated = await apiPut(`/products/${id}`, payload);
    setItems((arr) => arr.map((p) => (p.id === id ? updated : p)));
  }

  async function deleteProduct(id) {
    await apiDelete(`/products/${id}`);
    setItems((arr) => arr.filter((p) => p.id !== id));
  }

  return {
    items: filtered,
    loading,
    q,
    setQ,
    createProduct,
    updateProduct,
    deleteProduct,
    reload: load,
  };
}
