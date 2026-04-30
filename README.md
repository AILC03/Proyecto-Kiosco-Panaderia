# 🥐 Panadería POS App (React + Firebase)
 
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
- Registro de ventas en Firebase
- Soporte para imágenes por URL
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
        ↓
Se guarda en Firebase
        ↓
Se imprime el ticket
```
 
---
 
## Tecnologías
 
| Categoría   | Tecnología                        |
|-------------|-----------------------------------|
| Frontend    | React, Vite, TailwindCSS          |
| Enrutamiento | React Router                     |
| QR          | html5-qrcode                      |
| Estado      | Context API                       |
| Backend     | Firebase                          |
 
---
## Firebase

La aplicación utiliza Firebase Firestore como base de datos en tiempo real.

Colecciones utilizadas:

- `products` → productos del sistema
- `employees` → usuarios administrativos
- `sales` → registro de ventas
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
├── services/          # Backend real con Firebase (Firestore)
│
└── app/
    └── router.jsx     # Configuración de rutas
```
 
---
 
## Instalación y ejecución
 
```bash
# 1. Clonar el repositorio
git clone https://github.com/AILC03/Proyecto-Kiosco-Panaderia.git
 
# 2. Entrar al proyecto
cd panaderia-app
 
# 3. Instalar dependencias
npm install
 
# 4. Ejecutar servidor de desarrollo
npm run dev
```
 
---
## Usarlo desde Celular con ngrok
Despues de hacer :
```bash
npm run dev
```
Para usar este software desde un dispositivo móvil tendremos que usar Ngrok. Abriremos otra terminal y escribiremos el comando :
```bash
# N corresponde a el puerto en el que esta corriendo
npx ngrok http N 
```
Tomaremos la linea "Fowarding" y abriremos el link que aparece ahí desde el dispositivo móvil 

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
 
Login básico para administradores con validación por número de empleado y contraseña validación contra Firebase (colección `employees`).
 
---
 
## Roadmap
 
- [x] Historial de ventas
- [x] Integración con backend (Node.js / Firebase / API REST)
- [x] Base de datos real con Firebase
- [x] Reportes de ventas
- [ ] Integración con pagos
- [x] Generación de tickets en PDF
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
 
