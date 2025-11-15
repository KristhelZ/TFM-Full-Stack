import React, { useEffect, useState } from "react";

const EMPTY = {
  name: "",
  brand: "",
  category: "",
  description: "",
  price: "",
  stock: "",
  image_url: "",
};

export default function ProductForm({ open, initial, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(initial ? { ...EMPTY, ...initial } : EMPTY);
  }, [initial, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price || 0),
      stock: Number(form.stock || 0),
    };
    onSubmit(payload);
  }

  return (
    <div className="admin__modal">
      <div className="admin__modal-card">
        <h3 className="admin__modal-title">
          {initial ? "Editar producto" : "Nuevo producto"}
        </h3>

        <form className="admin__form" onSubmit={handleSubmit}>
          <div className="admin__grid">
            <label className="admin__field">
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>

            <label className="admin__field">
              <span>Brand</span>
              <input name="brand" value={form.brand} onChange={handleChange} />
            </label>

            <label className="admin__field">
              <span>Category</span>
              <input name="category" value={form.category} onChange={handleChange} />
            </label>

            <label className="admin__field">
              <span>Price</span>
              <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
            </label>

            <label className="admin__field">
              <span>Stock</span>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} />
            </label>

            <label className="admin__field admin__field--full">
              <span>URL image</span>
              <input name="image_url" value={form.image_url} onChange={handleChange} />
            </label>

            <label className="admin__field admin__field--full">
              <span>Description</span>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
            </label>
          </div>

          <div className="admin__modal-actions">
            <button type="button" className="admin__btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin__btn admin__btn--primary">
              {initial ? "Guardar cambios" : "Crear producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
