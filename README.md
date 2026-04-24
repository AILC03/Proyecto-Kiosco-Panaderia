# 🥐 Panadería POS App
 
Sistema de Punto de Venta (POS) para panaderías y cafeterías, con generación de órdenes por QR y panel administrativo completo.
 
---
 
## Descripción
 
Panadería POS App es una aplicación web desarrollada con **React** que simula un sistema completo de punto de venta para cafeterías o panaderías.
 
Los clientes generan pedidos desde un kiosco mediante código QR, y los cajeros los procesan desde un panel de administración con opciones de edición, gestión de productos, empleados y generación de tickets.
 
> Diseñado como solución escalable, lista para integrarse con un backend en el futuro.
 
---
 
## Funcionalidades
 
### 👤 Módulo Cliente (Kiosco)
- Visualización de productos disponibles
- Carrito de compra dinámico
- Generación de código QR con el pedido
- Interfaz simple tipo kiosco
### 🧑‍💼 Módulo Administrador (POS)
- Login de empleados
- Escaneo de QR para cargar pedidos automáticamente
- Venta manual sin necesidad de QR
- Edición del carrito en tiempo real
- Cálculo automático de subtotal, IVA y total
- Generación e impresión de ticket
### 📦 Gestión de Productos
- Alta, edición, activación y desactivación de productos
### 👨‍💼 Gestión de Empleados
- Alta, edición, activación y desactivación de empleados
---
 
## Flujo del sistema
 
```
Cliente selecciona productos
        ↓
Se genera código QR con la orden
        ↓
Cajero escanea el QR desde el panel admin
        ↓
La orden se carga automáticamente en caja
        ↓
Cajero edita o agrega productos (opcional)
        ↓
Se finaliza la venta y se imprime el ticket
```
 
---
 
## Tecnologías
 
| Categoría   | Tecnología                        |
|-------------|-----------------------------------|
| Frontend    | React, Vite, TailwindCSS          |
| Enrutamiento | React Router                     |
| QR          | html5-qrcode                      |
| Estado      | Context API                       |
| Persistencia | localStorage (simulación backend) |
 
---
 
## Arquitectura del proyecto
 
```
src/
├── pages/
│   ├── client/        # Interfaz de usuario (kiosco)
│   └── admin/         # Panel de administración (POS)
│
├── components/        # Componentes reutilizables
├── layouts/           # Layouts (AdminLayout)
├── context/           # Estado global (StoreContext)
├── services/          # Simulación de backend
│
└── app/
    └── router.jsx     # Configuración de rutas
```
 
---
 
## Instalación y ejecución
 
```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/TU_REPO.git
 
# 2. Entrar al proyecto
cd panaderia-app
 
# 3. Instalar dependencias
npm install
 
# 4. Ejecutar servidor de desarrollo
npm run dev
```
 
---
 
## Rutas principales
 
| Módulo       | Ruta           |
|--------------|----------------|
| Cliente      | `/client/menu` |
| Administrador | `/admin/login` |
 
---
 
## Credenciales de prueba
 
```
Número de empleado: 123
Contraseña:         123
```
 
---
 
## Autenticación
 
Login básico para administradores con validación por número de empleado y contraseña contra el estado local (simulación de backend). La sesión se mantiene en `localStorage`.
 
---
 
## Roadmap
 
- [ ] Historial de ventas
- [ ] Integración con backend (Node.js / Firebase / API REST)
- [ ] Base de datos real
- [ ] Sistema de roles (admin / cajero)
- [ ] Reportes de ventas
- [ ] Integración con pagos
- [ ] Generación de tickets en PDF
- [ ] Escaneo de códigos de barras
---
 
## Propósito del proyecto
 
Desarrollado como práctica de:
 
- Arquitectura frontend escalable
- Manejo de estado global con Context API
- Simulación de sistemas reales (POS)
- Integración de hardware (cámara / QR)
- UX tipo aplicación comercial
---
 
## Autor
 
**Angel Ivan Lopez Calvillo**
 
