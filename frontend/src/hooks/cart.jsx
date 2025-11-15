export function getToken() {
  return localStorage.getItem("auth_token") || "";
}

export function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem("auth_user") || "null");
  } catch {
    return null;
  }
}

export function readCartItems() {
  const raw = localStorage.getItem("cart_items");
  if (!raw) return null;

  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) return null;

    const items = arr
      .map((it) => {
        const productId = Number(it.productId ?? it.id);
        const quantity = Number(it.quantity ?? 1);
        if (!productId || quantity <= 0) return null;
        return { productId, quantity };
      })
      .filter(Boolean);

    return items.length ? items : null;
  } catch {
    return null;
  }
}

export function buildFallbackItems(defaultProductId, quantity) {
  const id =
    Number(localStorage.getItem("selected_product_id")) || Number(defaultProductId);
  return [{ productId: id, quantity: Number(quantity) || 1 }];
}

export function formatCurrency(n) {
  const num = Number(n || 0);
  return `$${num.toFixed(2)}`;
}
