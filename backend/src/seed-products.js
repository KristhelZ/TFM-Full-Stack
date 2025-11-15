import { sequelize, Producto } from "./models/mysql/index.js";
import "dotenv/config";

// ========================================
// DATOS DE PRODUCTOS
// ========================================
const productos = [
  {
    name: "Shortboard Pro 6'2\"",
    brand: "Channel Islands",
    category: "Tablas",
    description: "Tabla de surf de alto rendimiento para olas medianas",
    price: 649.99,
    stock: 8,
    image_url: "/img/shortboard1.png",
    active: true,
  },
  {
    name: "Longboard Classic 9'0\"",
    brand: "Stewart",
    category: "Tablas",
    description: "Longboard clásico ideal para principiantes y olas pequeñas",
    price: 799.99,
    stock: 5,
    image_url: "/img/longboard1.png",
    active: true,
  },
  {
    name: "Fish Retro 5'8\"",
    brand: "Lost Surfboards",
    category: "Tablas",
    description: "Diseño retro perfecto para días pequeños y medianos",
    price: 579.99,
    stock: 12,
    image_url: "/img/shortboard2.png",
    active: true,
  },
  {
    name: "Softboard 7'0\"",
    brand: "Wavestorm",
    category: "Tablas",
    description: "Tabla blanda perfecta para aprender a surfear",
    price: 299.99,
    stock: 20,
    image_url: "/img/softboard1.png",
    active: true,
  },
  {
    name: "Wetsuit 3/2mm Fullsuit",
    brand: "Rip Curl",
    category: "Neoprenos",
    description: "Traje completo para aguas templadas",
    price: 189.99,
    stock: 15,
    image_url: "/img/wetsuits.jpg",
    active: true,
  },
  {
    name: "Wetsuit 4/3mm Winter",
    brand: "O'Neill",
    category: "Neoprenos",
    description: "Traje de invierno con forro térmico",
    price: 249.99,
    stock: 10,
    image_url: "/img/wetsuits.jpg",
    active: true,
  },
  {
    name: "Leash Competition 6ft",
    brand: "FCS",
    category: "Accesorios",
    description: "Invento de competición ultra resistente",
    price: 34.99,
    stock: 25,
    image_url: "/img/accesories.png",
    active: true,
  },
  {
    name: "Deck Grip 3-Piece",
    brand: "Dakine",
    category: "Accesorios",
    description: "Grip pad antideslizante en 3 piezas",
    price: 29.99,
    stock: 30,
    image_url: "/img/accesories.png",
    active: true,
  },
  {
    name: "Surf Wax Tropical",
    brand: "Sticky Bumps",
    category: "Accesorios",
    description: "Cera para aguas cálidas",
    price: 4.99,
    stock: 50,
    image_url: "/img/accesories.png",
    active: true,
  },
  {
    name: "Rashguard UV 50+ Manga Larga",
    brand: "Quiksilver",
    category: "Ropa",
    description: "Protección solar de manga larga",
    price: 45.99,
    stock: 18,
    image_url: "/img/clothes.png",
    active: true,
  },
];

// ========================================
// FUNCIÓN PRINCIPAL
// ========================================
async function seedProducts() {
  try {
    await sequelize.authenticate();
    console.log("✓ Conectado a MySQL\n");

    // Sincronizar modelo de productos
    await Producto.sync({ force: false });
    console.log("✓ Tabla de productos sincronizada\n");

    // ========================================
    // SEED PRODUCTOS
    // ========================================
    console.log("🛹 Insertando productos...");

    // Limpiar productos existentes (opcional)
    await Producto.destroy({ where: {} });
    console.log("  → Productos anteriores eliminados");

    // Insertar nuevos productos
    for (const prod of productos) {
      await Producto.create(prod);
      console.log(`  ✓ ${prod.name} [${prod.brand}]`);
    }

    console.log(`\n ${productos.length} productos insertados exitosamente\n`);

    process.exit(0);
  } catch (error) {
    console.error("✗ Error:", error);
    process.exit(1);
  }
}

seedProducts();
