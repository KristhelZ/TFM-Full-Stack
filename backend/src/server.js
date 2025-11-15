import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

import { sequelize, Role } from "./models/mysql/index.js";

import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";

import ordersRoutes from "./routes/orders.routes.js";


const app = express();

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf?.toString?.() || "";
    },
  })
);
app.use(
  express.urlencoded({
    extended: true,
    verify: (req, _res, buf) => {
      req.rawBody = buf?.toString?.() || "";
    },
  })
);

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

let mysqlStatus = "down";

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    mysql: mysqlStatus,
  
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
  (async () => {
    try {
      await sequelize.authenticate();
     
      mysqlStatus = "up";
      console.log("MySQL conectado");

      const baseRoles = ["admin", "user"];
      for (const name of baseRoles) {
        await Role.findOrCreate({
          where: { name },
          defaults: { name, enable: true },
        });
      }
    } catch (e) {
      mysqlStatus = "down";
      console.error("Error MySQL:", e.message);
    }
  })();
});
