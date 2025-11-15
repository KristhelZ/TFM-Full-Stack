import React from "react";

export default function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="admin__modal">
      <div className="admin__modal-card">
        <h3 className="admin__modal-title">{title || "Confirmación"}</h3>
        <p className="admin__modal-message">{message}</p>
        <div className="admin__modal-actions">
          <button className="admin__btn" onClick={onCancel}>Cancel</button>
          <button className="admin__btn admin__btn--danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
