# 🏄 Surfshop Backend API

Backend REST API para una tienda online de productos de surf. Construido con Node.js, Express, Sequelize y MySQL.

backend/
├── node_modules/                 # Dependencias del proyecto (autogenerado por npm)
├── src/                       
│   ├── config/                   # Configuración general
│   │   └── mysql.js              # Conexión y configuración de Sequelize con MySQL
│   │
│   ├── controllers/              # Controladores que gestionan la lógica de negocio
│   │   ├── orders.controller.js  # Controlador de pedidos (crear, listar, obtener)
│   │   └── products.controller.js# Controlador de productos (CRUD)
│   │
│   ├── docs/                     # (Reservado para documentación Swagger)
│   │
│   ├── middleware/               # Middlewares personalizados de Express
│   │   ├── auth.js               # Autenticación JWT 
│   │   ├── roles.js              # Control de roles y permisos 
│   │   └── validate.js           # Middleware genérico para validar datos con Joi
│   │
│   ├── models/                   # Modelos de base de datos (ORM Sequelize)
│   │   └── mysql/                # Modelos asociados al motor MySQL
│   │       ├── index.js          # Inicializa Sequelize y define asociaciones
│   │       ├── orders.js         # Modelo de tabla "orders"
│   │       ├── PersonalAccessToken.js # Modelo de tokens 
│   │       ├── products.js       # Modelo de tabla "products"
│   │       ├── roles.js          # Modelo de tabla "roles"
│   │       └── users.js          # Modelo de tabla "users"
│   │
│   ├── routes/                   # Rutas HTTP de la API (definen los endpoints)
│   │   ├── auth.routes.js        # Endpoints de registro, login y refresh token
│   │   ├── orders.routes.js      # Endpoints de pedidos
│   │   └── products.routes.js    # Endpoints de productos (públicos + admin)
│   │
│   ├── tests/                    # Pruebas automáticas con Jest/Supertest
│   │   └── products.test.js      # Tests unitarios de controladores de productos
│   │
│   └── validators/               # Esquemas Joi para validar datos de entrada
│       ├── auth.schema.js        # Validación de login/registro/refresh
│       ├── orders.schema.js      # Validación de creación de pedidos
│       └── products.schema.js    # Validación de creación/actualización de productos
│
├── seed-all.js                   # Seeder completo: roles, usuarios y productos
├── seed-products.js              # Seeder de productos
├── seed-users-roles.js           # Seeder de roles y usuarios
│
├── server.js                     # Punto de entrada principal del servidor Express
│
├── .env                          # Variables de entorno 
├── .env.example                  # Ejemplo de .env con claves vacías
├── .gitignore                    # Archivos/carpetas 
│
├── jest.config.js                # Configuración de Jest para tests ESM
├── package-lock.json             # Dependencias npm
├── package.json                  # Configuración del proyecto, scripts y dependencias
└── README.md                     # Documentación principal del backend

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Base de Datos](#-base-de-datos)
- [Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Seeds de Prueba](#-seeds-de-prueba)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Testing](#-testing)
- [Variables de Entorno](#-variables-de-entorno)

---

## ✨ Características

- ✅ Autenticación JWT (Access Token + Refresh Token)
- ✅ Sistema de roles (admin, user, moderator)
- ✅ CRUD completo de productos
- ✅ Validación de datos con Joi
- ✅ Seguridad con Helmet y CORS
- ✅ Documentación Swagger 
- ✅ Tests con Jest y Supertest

---

## 🛠 Tecnologías

- **Node.js** v18+ / v20+
- **Express** v5.1.0
- **Sequelize** v6.37.7 (ORM)
- **MySQL** v8.0+
- **JWT** para autenticación
- **Bcrypt** para hash de contraseñas
- **Joi** para validación
- **Jest** para testing

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 ([Descargar](https://nodejs.org/))
- **npm** >= 9.0.0 (incluido con Node.js)
- **MySQL** >= 8.0 ([Descargar](https://dev.mysql.com/downloads/))
- **Git** (opcional, para clonar el repo)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/surfshop-backend.git
cd surfshop-backend/backend
```

### 2. Instalar dependencias

```bash
npm install
```

---

## ⚙️ Configuración

### 1. Crear la base de datos en MySQL

Conecta a MySQL y crea la base de datos:

```bash
mysql -u root -p
```

Luego ejecuta:

```sql
CREATE DATABASE tienda_online CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- =====================================================
-- TABLA: products
-- =====================================================
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `brand` VARCHAR(120) DEFAULT NULL,
  `category` VARCHAR(120) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `stock` INT NOT NULL DEFAULT 0,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_brand` (`brand`),
  INDEX `idx_active` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =====================================================
-- TABLA: roles
-- =====================================================
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `enable` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_name` (`name`),
  INDEX `idx_enable` (`enable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =====================================================
-- TABLA: users
-- =====================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_role` (`role`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role`) REFERENCES `roles` (`name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- =====================================================
-- TABLA: orders
-- Registra pedidos desde el frontend (carrito.jsx)
-- Campos clave: userId (nullable), name, address, total, status
-- =====================================================
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NULL,
  `name` VARCHAR(120) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `total` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `status` VARCHAR(50) NOT NULL DEFAULT 'created',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Índices útiles
  INDEX `idx_userId` (`userId`),
  INDEX `idx_status` (`status`),

  -- FK al usuario (si existe). Si borras el usuario, mantenemos el pedido, dejando userId en NULL
  CONSTRAINT `fk_orders_user`
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;



EXIT;
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend/` copiando el ejemplo:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# =====================================
# SERVIDOR
# =====================================
PORT=3000
NODE_ENV=development

# =====================================
# JWT SECRETS
# =====================================
# IMPORTANTE: Genera secretos fuertes únicos para producción
# Puedes usar: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=tu_secreto_jwt_super_seguro_32_caracteres_minimo
JWT_EXPIRES=15m

REFRESH_SECRET=tu_refresh_secret_super_seguro_64_caracteres_minimo
REFRESH_EXPIRES=7d

# =====================================
# MYSQL DATABASE
# =====================================
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DB=tienda_online
MYSQL_USER=root
MYSQL_PASS=tu_contraseña_mysql

# =====================================
# CORS
# =====================================
CORS_ORIGIN=http://localhost:5173
```

#### ⚠️ **Variables Críticas a Configurar:**

| Variable         | Descripción                 | Ejemplo                       |
| ---------------- | --------------------------- | ----------------------------- |
| `MYSQL_HOST`     | Host de MySQL               | `127.0.0.1` o `localhost`     |
| `MYSQL_PORT`     | Puerto de MySQL             | `3306` (por defecto)          |
| `MYSQL_DB`       | Nombre de la base de datos  | `tienda_online`               |
| `MYSQL_USER`     | Usuario de MySQL            | `root`                        |
| `MYSQL_PASS`     | Contraseña de MySQL         | `tu_password`                 |
| `JWT_SECRET`     | Secreto para Access Tokens  | Mín. 32 caracteres aleatorios |
| `REFRESH_SECRET` | Secreto para Refresh Tokens | Mín. 64 caracteres aleatorios |

#### 🔒 **Generar Secretos Fuertes:**

```bash
# Para JWT_SECRET (32 bytes = 64 caracteres hex)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Para REFRESH_SECRET (64 bytes = 128 caracteres hex)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🗄 Base de Datos

### Crear datos automáticamente

Los datos se crean automáticamente al ejecutar el seed o al iniciar el servidor por primera vez gracias a Sequelize:

```bash
npm run seed
```

---

## ▶️ Ejecutar el Proyecto

### Modo desarrollo (con nodemon)

```bash
npm run dev
```

El servidor iniciará en `http://localhost:3000`

### Modo producción

```bash
npm start
```

### Verificar que está funcionando

Abre tu navegador o usa curl:

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:

```json
{
  "ok": true,
  "mysql": "up"
}
```

---

## 📜 Scripts Disponibles

| Script         | Comando                 | Descripción                                   |
| -------------- | ----------------------- | --------------------------------------------- |
| Desarrollo     | `npm run dev`           | Inicia el servidor con nodemon   |
| Producción     | `npm start`             | Inicia el servidor en modo producción         |
| Seed completo  | `npm run seed`          | Inserta roles, usuarios y productos de prueba |
| Seed usuarios  | `npm run seed:users`    | Solo inserta roles y usuarios                 |
| Seed productos | `npm run seed:products` | Solo inserta productos                        |
| Tests          | `npm test`              | Ejecuta los tests con Jest                    |

---

## 🌱 Seeds de Prueba

### Ejecutar seed completo

Inserta todos los datos de prueba (roles, usuarios, productos):

```bash
npm run seed
```

### ¿Qué datos inserta el seed?

#### **1️⃣ Roles (3)**

| ID  | Nombre    | Estado |
| --- | --------- | ------ |
| 1   | admin     | Activo |
| 2   | user      | Activo |
| 3   | moderator | Activo |

#### **2️⃣ Usuarios (10)**

| Nombre           | Email                      | Contraseña    | Rol       |
| ---------------- | -------------------------- | ------------- | --------- |
| Admin Principal  | admin@surfshop.com         | `password123` | admin     |
| Admin Secundario | admin2@surfshop.com        | `password123` | admin     |
| Moderador Tienda | mod@surfshop.com           | `password123` | moderator |
| Juan García      | juan.garcia@email.com      | `password123` | user      |
| María López      | maria.lopez@email.com      | `password123` | user      |
| Carlos Rodríguez | carlos.rodriguez@email.com | `password123` | user      |
| Ana Martínez     | ana.martinez@email.com     | `password123` | user      |
| Pedro Sánchez    | pedro.sanchez@email.com    | `password123` | user      |
| Laura Fernández  | laura.fernandez@email.com  | `password123` | user      |
| David Torres     | david.torres@email.com     | `password123` | user      |

**🔑 Credenciales de prueba:**

```
Email: admin@surfshop.com
Contraseña: password123
```

#### **3️⃣ Productos (10)**

| Categoría      | Productos                                                                    |
| -------------- | ---------------------------------------------------------------------------- |
| **Surfboards**     | Shortboard Pro 6'2", Longboard Classic 9'0", Fish Retro 5'8", Softboard 7'0" |
| **Wetsuits**       | Wetsuit 3/2mm, Wetsuit 4/3mm Winter                                          |
| **Clothes**        | Leash Competition 6ft, Deck Grip 3-Piece, Surf Wax Tropical                  |
| 

**Marcas incluidas:** Channel Islands, Stewart, Lost Surfboards, Wavestorm, Rip Curl, O'Neill, FCS, Dakine, Sticky Bumps, Quiksilver

---

## 🔌 Endpoints de la API

### **Autenticación**

| Método | Endpoint             | Descripción             | Auth |
| ------ | -------------------- | ----------------------- | ---- |
| POST   | `/api/auth/register` | Registrar nuevo usuario | No   |
| POST   | `/api/auth/login`    | Iniciar sesión          | No   |
| POST   | `/api/auth/refresh`  | Renovar access token    | No   |

### **Productos**

| Método | Endpoint            | Descripción                | Auth  |
| ------ | ------------------- | -------------------------- | ----- |
| GET    | `/api/products`     | Listar todos los productos | No    |
| GET    | `/api/products/:id` | Obtener producto por ID    | No    |
| POST   | `/api/products`     | Crear producto             | Admin |
| PUT    | `/api/products/:id` | Actualizar producto        | Admin |
| DELETE | `/api/products/:id` | Eliminar producto          | Admin |

### **Salud del Sistema**

| Método | Endpoint      | Descripción              | Auth |
| ------ | ------------- | ------------------------ | ---- |
| GET    | `/api/health` | Estado del servidor y BD | No   |


---

## 🧪 Testing

Ejecutar todos los tests:

```bash
npm test
```

Ejecutar tests en modo watch:

```bash
npm test -- --watch
```

Ejecutar tests con coverage:

```bash
npm test -- --coverage
```

---

## 🔐 Variables de Entorno

### **Plantilla completa de `.env`**

```env
# =====================================
# SERVIDOR
# =====================================
PORT=3000
NODE_ENV=development

# =====================================
# JWT SECRETS (Cambiar en producción!)
# =====================================
JWT_SECRET=genera_un_secreto_aleatorio_minimo_32_caracteres
JWT_EXPIRES=15m
REFRESH_SECRET=genera_otro_secreto_aleatorio_minimo_64_caracteres
REFRESH_EXPIRES=7d

# =====================================
# MYSQL DATABASE
# =====================================
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DB=tienda_online
MYSQL_USER=root
MYSQL_PASS=tu_password_mysql

# =====================================
# CORS
# =====================================
CORS_ORIGIN=http://localhost:5173
```

---

## 🚨 Notas Importantes

### **Seguridad**

⚠️ **NUNCA versiones el archivo `.env` en Git**

- Agrega `.env` a tu `.gitignore`
- Usa `.env.example` como plantilla sin valores reales
- En producción, usa secretos fuertes generados aleatoriamente
- Cambia la contraseña por defecto de MySQL

### **Producción**

- Configura CORS apropiadamente con tu dominio real
- Usa HTTPS en producción
- Configura rate limiting para prevenir ataques
- Considera usar variables de entorno del sistema en lugar de archivo `.env`

---

## 📝 Licencia

MIT © 2025 Surfshop

---

## 👨‍💻 Autor

**Kristhel Zoeger**

- GitHub: @kristhelZ (https://github.com/KristhelZ)
- Email: kristhelzoegercardenas@gmail.com

---

