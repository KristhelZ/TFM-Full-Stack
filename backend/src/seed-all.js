import bcrypt from "bcrypt";
import { sequelize, Role, User, Producto } from "./models/mysql/index.js";
import "dotenv/config";

// ========================================
// DATOS DE ROLES
// ========================================
const roles = [
  { name: "admin", enable: true },
  { name: "user", enable: true },
  { name: "moderator", enable: true },
];

// ========================================
// DATOS DE USUARIOS
// ========================================
const usuarios = [
  {
    name: "Admin Principal",
    email: "admin@surfshop.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "Admin Secundario",
    email: "admin2@surfshop.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "Moderador Tienda",
    email: "mod@surfshop.com",
    password: "password123",
    role: "moderator",
  },
  {
    name: "Juan García",
    email: "juan.garcia@email.com",
    password: "password123",
    role: "user",
  },
  {
    name: "María López",
    email: "maria.lopez@email.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Pedro Sánchez",
    email: "pedro.sanchez@email.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Laura Fernández",
    email: "laura.fernandez@email.com",
    password: "password123",
    role: "user",
  },
  {
    name: "David Torres",
    email: "david.torres@email.com",
    password: "password123",
    role: "user",
  },
];

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
async function seedAll() {
  try {
    await sequelize.authenticate();
    console.log("✓ Conectado a MySQL\n");

    // Sincronizar modelos
    await Role.sync({ force: false });
    await User.sync({ force: false });
    await Producto.sync({ force: false });
    console.log("✓ Tablas sincronizadas\n");

    // ========================================
    // SEED ROLES
    // ========================================
    console.log("📋 Insertando roles...");
    for (const rol of roles) {
      const [roleRecord, created] = await Role.findOrCreate({
        where: { name: rol.name },
        defaults: rol,
      });
      console.log(`  ${created ? "✓" : "→"} ${roleRecord.name}`);
    }

    // ========================================
    // SEED USUARIOS
    // ========================================
    console.log("\n👥 Insertando usuarios...");
    for (const usuario of usuarios) {
      const existente = await User.findOne({ where: { email: usuario.email } });
      if (existente) {
        console.log(`  → ${usuario.email} (ya existe)`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(usuario.password, 10);
      await User.create({
        ...usuario,
        password: hashedPassword,
      });
      console.log(`  ✓ ${usuario.name} [${usuario.role}]`);
    }

    // ========================================
    // SEED PRODUCTOS
    // ========================================
    console.log("\n🛹 Insertando productos...");
    for (const prod of productos) {
      await Producto.create(prod);
      console.log(`  ✓ ${prod.name}`);
    }

    console.log("\n Seed completado exitosamente");
    console.log("\n Credenciales de prueba:");
    console.log("   Email: admin@surfshop.com");
    console.log("   Contraseña: password123\n");

    process.exit(0);
  } catch (error) {
    console.error("✗ Error:", error);
    process.exit(1);
  }
}

seedAll();
