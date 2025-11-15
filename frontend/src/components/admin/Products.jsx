import React from "react";

export default function ProductsTable({
  items,
  loading,
  onEdit,
  onDelete,
  onCreateClick,
  q,
  setQ,
}) {
  return (
    <section className="admin__section">
      <div className="admin__toolbar">
        <input
          className="admin__search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre, marca o categoría…"
        />
        <button className="admin__btn admin__btn--primary" onClick={onCreateClick}>
          + New Product
        </button>
      </div>

      <div className="admin__table-wrapper">
        <table className="admin__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="admin__empty">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={8} className="admin__empty">No results</td></tr>
            ) : (
              items.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.category}</td>
                  <td>${Number(p.price ?? 0).toFixed(2)}</td>
                  <td>{p.stock ?? 0}</td>
                  <td className="admin__img-cell">
                    {p.image_url ? <img src={p.image_url} alt={p.name} /> : "-"}
                  </td>
                  <td className="admin__actions">
                    <button className="admin__btn" onClick={() => onEdit(p)}>Edit</button>
                    <button className="admin__btn admin__btn--danger" onClick={() => onDelete(p)}>
                      Delete
                    </button>
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
