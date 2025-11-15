import bcrypt from "bcrypt";
import { sequelize, Role, User } from "./models/mysql/index.js";
import "dotenv/config";

const roles = [
  { name: "admin", enable: true },
  { name: "user", enable: true },
  { name: "moderator", enable: true },
];

const usuarios = [
  // Administradores
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

  // Moderador
  {
    name: "Moderador Tienda",
    email: "mod@surfshop.com",
    password: "password123",
    role: "moderator",
  },

  // Usuarios regulares
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

async function seedRolesAndUsers() {
  try {
    await sequelize.authenticate();
    console.log("✓ Conectado a MySQL");

    await Role.sync({ force: false });
    console.log("✓ Tabla roles sincronizada");

    await User.sync({ force: false });
    console.log("✓ Tabla users sincronizada");

    // ========================================
    // INSERTAR ROLES
    // ========================================
    console.log("\n📋 Insertando roles...");
    for (const rol of roles) {
      const [roleRecord, created] = await Role.findOrCreate({
        where: { name: rol.name },
        defaults: rol,
      });

      if (created) {
        console.log(`  ✓ Rol creado: ${roleRecord.name}`);
      } else {
        console.log(`  → Rol ya existe: ${roleRecord.name}`);
      }
    }

    // ========================================
    // INSERTAR USUARIOS CON CONTRASEÑAS HASHEADAS
    // ========================================
    console.log("\n👥 Insertando usuarios...");
    for (const usuario of usuarios) {
      
      const existente = await User.findOne({ where: { email: usuario.email } });

      if (existente) {
        console.log(`  → Usuario ya existe: ${usuario.email}`);
        continue;
      }

      
      const hashedPassword = await bcrypt.hash(usuario.password, 10);

   
      await User.create({
        name: usuario.name,
        email: usuario.email,
        password: hashedPassword,
        role: usuario.role,
      });

      console.log(
        `  ✓ Usuario creado: ${usuario.name} (${usuario.email}) [${usuario.role}]`
      );
    }

    console.log("\n Seed completado exitosamente");
    console.log("\n Credenciales de prueba:");
    console.log("   Email: admin@surfshop.com");
    console.log("   Contraseña: password123");
    console.log("   Rol: admin\n");

    process.exit(0);
  } catch (error) {
    console.error("✗ Error durante el seed:", error);
    process.exit(1);
  }
}

seedRolesAndUsers();
