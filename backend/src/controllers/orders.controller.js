import { Sequelize } from "sequelize";
import { Order, Producto } from "../models/mysql/index.js";

function pickProductPayload(body) {
  
  if (body?.productId) {
    return {
      productId: Number(body.productId),
      quantity: Number(body.quantity || 1),
    };
  }
 
  const it = Array.isArray(body?.items) && body.items.length ? body.items[0] : null;
  if (it?.productId) {
    return {
      productId: Number(it.productId),
      quantity: Number(it.quantity || 1),
    };
  }
  return null;
}

export async function createOrder(req, res) {
  try {
    const { name, address } = req.body;
    const picked = pickProductPayload(req.body);
    if (!picked) {
      return res.status(400).json({ message: "Falta productId/quantity o items[0]" });
    }

    const { productId, quantity } = picked;

    const product = await Producto.findOne({
      where: { id: productId, active: true },
      attributes: ["id", "price"],
    });
    if (!product) return res.status(400).json({ message: "Producto inválido o inactivo" });

    const unitPrice = Number(product.price);
    const total = Number((unitPrice * quantity).toFixed(2));

    const order = await Order.create({
      userId: req.user?.id || null,
      name,
      address,
      productId,
      quantity,
      unitPrice,
      total,
      status: "created",
    });

    return res.status(201).json({
      id: order.id,
      total,
      status: order.status,
      productId,
      quantity,
      unitPrice,
      createdAt: order.createdAt,
    });
  } catch (e) {
    return res.status(500).json({ message: "Error creando orden", error: e.message });
  }
}

export async function listOrders(_req, res) {
  try {
    const rows = await Order.findAll({
      order: [["id", "DESC"]],
      include: [{ model: Producto, as: "product", attributes: ["id", "name", "price"] }],
    });
    return res.json(rows);
  } catch (e) {
    return res.status(500).json({ message: "Error listando órdenes", error: e.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const id = req.params.id;
    const row = await Order.findByPk(id, {
      include: [{ model: Producto, as: "product", attributes: ["id", "name", "price"] }],
    });
    if (!row) return res.status(404).json({ message: "No encontrado" });
    return res.json(row);
  } catch (e) {
    return res.status(500).json({ message: "Error obteniendo orden", error: e.message });
  }
}
