import { Producto } from "../models/mysql/index.js";

const CATS = ["Surfboards", "Wetsuits", "Clothes"];

export async function listPublic(req, res) {
  try {
    const rows = await Producto.findAll({ where: { active: true } });
    return res.json(rows);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error listando productos", error: e.message });
  }
}

export async function createProducto(req, res) {
  try {
    const body = req.body;

    if (body.price < 0)
      return res
        .status(422)
        .json({ message: "El precio no puede ser negativo" });
    if (body.stock < 0)
      return res
        .status(422)
        .json({ message: "El stock no puede ser negativo" });
    if (body.category && !CATS.includes(body.category)) {
      return res
        .status(422)
        .json({ message: `Categoría inválida. Usa: ${CATS.join(", ")}` });
    }
    console.log(body);
    const p = await Producto.create(body);

    return res.status(201).json(p);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error creando producto", error: e.message });
  }
}

export async function updateProducto(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;

    if (body.price !== undefined && body.price < 0) {
      return res
        .status(422)
        .json({ message: "El precio no puede ser negativo" });
    }
    if (body.stock !== undefined && body.stock < 0) {
      return res
        .status(422)
        .json({ message: "El stock no puede ser negativo" });
    }
    if (body.category && !CATS.includes(body.category)) {
      return res
        .status(422)
        .json({ message: `Categoría inválida. Usa: ${CATS.join(", ")}` });
    }

    const [n] = await Producto.update(body, { where: { id } });
    if (!n) return res.status(404).json({ message: "No encontrado" });

    return res.json({ updated: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error actualizando producto", error: e.message });
  }
}

export async function softDeleteProducto(req, res) {
  try {
    const id = req.params.id;
    const [n] = await Producto.update({ active: false }, { where: { id } });
    if (!n) return res.status(404).json({ message: "No encontrado" });

    return res.json({ deleted: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error eliminando producto", error: e.message });
  }
}
