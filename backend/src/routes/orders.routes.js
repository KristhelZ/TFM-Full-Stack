import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createOrderSchema } from "../validators/orders.schema.js";
import { createOrder, listOrders, getOrderById } from "../controllers/orders.controller.js";

const r = Router();

r.post("/", createOrder);
r.get("/", listOrders);
r.get("/:id", getOrderById);
 
export default r;
