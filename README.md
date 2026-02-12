# FerreLink - FerreteríaMaster

Sistema de gestión para ferreterías construido con Svelte 5. Maneja inventario, proveedores, ventas y reportes con una interfaz minimalista inspirada en Zed.dev.

## 🚀 Características

- ✅ **Sistema de Autenticación** - Login/registro con roles de usuario
- 🛠 **Gestión de Productos** - CRUD completo con códigos, precios, stock y descripciones
- 🏢 **Gestión de Proveedores** - Administra información de contacto y compañías
- 💰 **Sistema de Ventas** - Crea ventas con múltiples productos y actualización automática de stock
- 📊 **Reportes e Inventario** - Métricas en tiempo real, alertas de stock bajo
- 🎨 **Temas Light/Dark** - Toggle entre temas claro y oscuro
- 📱 **Diseño Responsivo** - Funciona en desktop y móvil
- 🔌 **Preparado para API** - Arquitectura lista para conectar con backend Python/Peewee

## 🛠 Tecnologías

- **Svelte 5** - Framework reactivo moderno
- **Vite** - Build tool rápido
- **Svelte Routing** - Navegación entre páginas
- **LocalStorage** - Persistencia de datos (temporal)
- **date-fns** - Manejo de fechas
- **nanoid** - Generación de IDs únicos
- **bcryptjs** - Hash de contraseñas

## 📦 Instalación

```bash
# Clonar el repositorio
cd ferrelink

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 🎯 Uso

### Primer Inicio

1. Abre `http://localhost:5173` en tu navegador
2. Haz clic en "Registrarse"
3. Crea tu primera cuenta de usuario
4. Inicia sesión con tus credenciales

### Estructura de Usuarios

El sistema incluye 3 roles:
- **Admin** - Acceso completo incluyendo gestión de usuarios
- **Gerente** - Acceso a reportes y datos
- **Vendedor** - Acceso básico para ventas

### Flujo de Trabajo Típico

1. **Registrar Proveedores** - Agrega información de tus proveedores
2. **Agregar Productos** - Registra productos con códigos, precios y stock
3. **Realizar Ventas** - Crea ventas seleccionando productos y cantidades
4. **Ver Reportes** - Monitorea inventario y métricas de ventas

## 📁 Estructura del Proyecto

```
ferrelink/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # Componentes de UI (Button, Input, Modal, etc.)
│   │   └── Navbar.svelte
│   ├── layouts/         # Layouts de página
│   │   ├── AppLayout.svelte
│   │   └── AuthLayout.svelte
│   ├── pages/           # Páginas principales
│   │   ├── Login.svelte
│   │   ├── Register.svelte
│   │   ├── Productos.svelte
│   │   ├── Proveedores.svelte
│   │   ├── Ventas.svelte
│   │   ├── Reportes.svelte
│   │   └── Users.svelte
│   ├── services/        # Servicios de datos
│   │   ├── localStorage.service.js
│   │   └── api.adapter.js
│   ├── stores/          # Stores de Svelte
│   │   ├── authStore.js
│   │   ├── productStore.js
│   │   ├── providersStore.js
│   │   ├── salesStore.js
│   │   ├── usersStore.js
│   │   ├── rolesStore.js
│   │   └── themeStore.js
│   ├── styles/          # Estilos globales
│   │   ├── theme.css
│   │   └── global.css
│   ├── App.svelte
│   └── main.js
├── API_INTEGRATION.md   # Guía de integración con backend
└── package.json
```

## 🔌 Integración con Backend

FerreLink está diseñado para migrar fácilmente de localStorage a una API backend. Ver [`API_INTEGRATION.md`](./API_INTEGRATION.md) para instrucciones detalladas.

### Cambio Rápido a API

En `src/services/api.adapter.js`:
```javascript
const USE_API = true;  // Cambiar de false a true
const API_BASE_URL = 'http://localhost:5000/api';  // Tu URL de API
```

### Modelo de Datos Compatible

El frontend está diseñado para trabajar con tu backend Python/Peewee:
- `Roles` - Roles de usuario
- `Users` - Usuarios del sistema
- `Products` - Inventario de productos
- `Providers` - Proveedores
- `Providers_Products` - Relación many-to-many
- `Sales` - Ventas realizadas
- `SaleItems` - Detalles de items vendidos

## 🎨 Sistema de Diseño

El diseño está inspirado en Zed.dev con:
- **Paleta minimalista** - Colores sutiles y profesionales
- **Tipografía limpia** - System fonts para mejor rendimiento
- **Espaciado generoso** - Respiro visual en todos los elementos
- **Animaciones suaves** - Transiciones de 150-300ms
- **Componentes reutilizables** - Button, Input, Card, Modal, Table, Select

## 📝 Notas de Desarrollo

- **Svelte 5 Runes** - Usa la nueva sintaxis de Svelte 5 donde sea posible
- **Stores** - Todos los stores siguen el patrón load/create/update/delete
- **Adapter Pattern** - Abstracción que permite cambiar de localStorage a API sin modificar componentes
- **Validaciones** - Realizadas en el frontend antes de persistir datos
- **Seguridad** - Passwords hasheados con bcryptjs (10 rounds)

---

**Desarrollado con ❤️ usando Svelte 5**
