# 🏄‍♂️ Frontend – Manu’s Surfshop (Vite + React)
frontend/
│
├── css/                        # Hojas de estilo por página/componente
│   ├── admin.css
│   ├── carrito.css
│   ├── cuenta.css
│   ├── header.css
│   ├── login.css
│   ├── producto.css
│   └── style.css
│
├── node_modules/               # Dependencias instaladas (generado por npm)
│
├── public/                     # Imágenes y assets públicos
│   └── img/
│
├── src/
│   │ ── __tests__/
│   │    └── login.test.jsx         # Test de flujo de login
│   │
│   ├── components/
│   │   ├── Header.jsx              # Header con menú y submenú responsive
│   │   ├── ProtectedRoute.jsx      # Protege rutas según token
│   │   └── admin/                  # Componentes del panel de administración
│   │       ├── ConfirmDialog.jsx   # Diálogo de confirmación para eliminar productos
│   │       ├── ProductForm.jsx     # Formulario para crear/editar productos
│   │       └── Products.jsx        # Listado CRUD de productos en el panel admin
│   │
│   ├── context/
│   │   └── AuthProvider.jsx        # Contexto global: login, logout, registro
│   │
│   ├── hooks/
│   │   ├── cart.jsx                # Funciones del carrito (token, user, items)
│   │   └── userProduct.js          # Hook CRUD de productos con API
│   │
│   ├── pages/                      # Páginas principales
│   │   ├── index.jsx               # Home
│   │   ├── login.jsx               # Login y autenticación con backend
│   │   ├── cuenta.jsx              # Área privada de usuario
│   │   ├── producto.jsx            # Vista de productos
│   │   ├── carrito.jsx             # Carrito + creación de pedidos
│   │   └── admin.jsx               # Panel de administración CRUD productos
│   │
│   ├── main.jsx                    # Punto de entrada con rutas
│   └── setupTests.js               # Configuración de testing (Vitest + RTL)
│
├── .env                            # Variables de entorno (URL API, etc.)
├── .gitignore                      # Archivos/carpetas que Git debe ignorar
├── eslint.config.js                # Reglas de linting para el proyecto
├── index.html                      # HTML base donde se monta React
├── package.json                    # Dependencias y scripts del frontend
├── package-lock.json               # Versión bloqueada de dependencias (npm)
├── README.md                       # Documentación del frontend
└── vite.config.js                  # Configuración de Vite

Aplicación **SPA** desarrollada con **React 19**, **Vite 7**, y **React Router 7**, que se conecta al backend de la tienda surfshop (Express + MySQL). Este README explica **solo el frontend**: instalación, configuración, estructura, conexión con el backend y testing.

---

## 🚀 **Instalación y ejecución**

### Requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+ (o pnpm/yarn)

#### ⚠️ **Variables Críticas a Configurar:**

| Función           | Método | Endpoint            | Autenticación        |
| ----------------- | ------ | ------------------- | -------------------- |
| Login             | POST   | `/api/auth/login`   | No                   |
| Listar productos  | GET    | `/api/products`     | No                   |
| Crear producto    | POST   | `/api/products`     | Bearer token (admin) |
| Editar producto   | PUT    | `/api/products/:id` | Bearer token (admin) |
| Eliminar producto | DELETE | `/api/products/:id` | Bearer token (admin) |
| Crear pedido      | POST   | `/api/orders`       | Bearer token (user)  |


####  **👤 Flujo de autenticación**
- Login (pages/login.jsx)
- Envía POST /api/auth/login.
- Guarda auth_token, auth_user y remember_email.
- Decodifica el JWT (Base64URL → JSON) para extraer el role.
- Redirige a /admin (si es admin) o /cuenta (si es usuario normal).
- Protección de rutas
- ProtectedRoute.jsx muestra hijos solo si hay token.
- admin.jsx además verifica que role === "admin".

 
####  **🛒 Carrito de compras **
- Archivo: pages/carrito.jsx
Funciones:

- Usa helpers de hooks/cart.jsx (getToken, readCartItems, formatCurrency).
- Si no hay productos en localStorage, crea un fallback.
- Envia el pedido al backend:
- Muestra mensaje de éxito con el número de pedido y total.

####  **🧑‍💼 Panel de administración**
- Archivo: pages/admin.jsx
- Funciones principales:
- Carga productos (GET /api/products).
- Crea (POST), edita (PUT) o elimina (DELETE) productos.
- Formularios con validaciones (precio/stock > 0, nombre obligatorio).
- Redirige a /login o /cuenta según rol.

####  **🧠 Hooks principales**
- cart.jsx → gestiona carrito, tokens y usuarios guardados.
- userProduct.js → abstrae el CRUD de productos.

####  **🧪 Testing**
- Framework: Vitest + React Testing Library + jsdom.
- Archivo principal: src/__tests__/login.test.jsx
- Qué prueba:
- Simula un login correcto (fetch mockeado).
- Verifica que se llama a /auth/login con método POST.
- Comprueba almacenamiento en localStorage y navegación.
- Ejecutar pruebas:  npm test

### Pasos
```bash
cd frontend
npm install       # instala dependencias
npm run dev       # inicia entorno de desarrollo (http://localhost:5173)



## 👨‍💻 Autor### 

**Kristhel Zoeger**

- GitHub: @kristhelZ (https://github.com/KristhelZ)
- Email: kristhelzoegercardenas@gmail.com
