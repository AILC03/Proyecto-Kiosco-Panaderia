🥐 PANADERÍA POS APP
Sistema de Punto de Venta (POS) con QR y panel administrativo

==================================================

📌 DESCRIPCIÓN

Panadería POS App es una aplicación web desarrollada con React que simula un sistema completo de punto de venta (POS) para cafeterías o panaderías.

El sistema permite a los clientes generar pedidos mediante un código QR y a los cajeros procesarlos en una interfaz tipo caja, con opción de edición manual, gestión de productos, empleados y generación de tickets.

Este proyecto está diseñado como una solución escalable, preparada para integrarse con un backend en el futuro.

==================================================

🚀 FUNCIONALIDADES PRINCIPALES

👤 Módulo Cliente
- Visualización de productos disponibles
- Carrito de compra dinámico
- Generación de código QR con el pedido
- Interfaz simple tipo kiosco

🧑‍💼 Módulo Administrador (POS)
- Login de empleados
- Escaneo de QR para cargar pedidos
- Venta manual (agregar productos sin QR)
- Edición del carrito en tiempo real
- Cálculo automático de subtotal, IVA y total
- Generación de ticket
- Impresión de ticket

📦 Gestión de Productos
- Alta de productos
- Edición de productos
- Activación / desactivación

👨‍💼 Gestión de Empleados
- Alta de empleados
- Edición de empleados
- Activación / desactivación

==================================================

🔄 FLUJO DEL SISTEMA

1. El cliente selecciona productos en el kiosco
2. Se genera un código QR con la orden
3. El cajero escanea el QR desde el panel admin
4. La orden se carga automáticamente en la caja
5. El cajero puede modificar la venta o agregar productos
6. Se finaliza la venta
7. Se genera un ticket imprimible

==================================================

🛠️ TECNOLOGÍAS UTILIZADAS

Frontend:
- React
- Vite
- TailwindCSS
- React Router

Librerías:
- html5-qrcode (escaneo de QR)

Estado:
- Context API
- localStorage (simulación de persistencia)

==================================================

📂 ARQUITECTURA DEL PROYECTO

src/
│
├── pages/
│   ├── client/        → interfaz de usuario (kiosco)
│   └── admin/         → panel de administración (POS)
│
├── components/        → componentes reutilizables
├── layouts/           → layouts (AdminLayout)
├── context/           → estado global (StoreContext)
├── services/          → simulación de backend
│
└── app/
    └── router.jsx     → configuración de rutas

==================================================

🔐 AUTENTICACIÓN

El sistema incluye un login básico para administradores basado en:

- Número de empleado
- Contraseña
- Validación contra estado local (simulación backend)

La sesión se guarda en localStorage.

==================================================

📸 CAPTURAS DEL SISTEMA

(Aquí puedes agregar imágenes)

Ejemplo:
- Menú cliente
- Carrito
- Generación de QR
- Panel de administración
- Ticket

==================================================

⚙️ INSTALACIÓN Y EJECUCIÓN

1. Clonar repositorio:

git clone https://github.com/TU_USUARIO/TU_REPO.git

2. Entrar al proyecto:

cd panaderia-app

3. Instalar dependencias:

npm install

4. Ejecutar servidor:

npm run dev

==================================================

📱 RUTAS PRINCIPALES

Cliente:
- /client/menu

Administrador:
- /admin/login

==================================================

🔐 CREDENCIALES DE PRUEBA

Número de empleado: 123
Contraseña: 123

==================================================

🚀 ROADMAP / MEJORAS FUTURAS

- Historial de ventas
- Integración con backend (Node.js / Firebase / API REST)
- Base de datos real
- Sistema de roles (admin / cajero)
- Reportes de ventas
- Integración con pagos
- Generación de tickets en PDF
- Escaneo de códigos de barras

==================================================

💡 PROPÓSITO DEL PROYECTO

Este proyecto fue desarrollado como práctica de:

- Arquitectura frontend escalable
- Manejo de estado global
- Simulación de sistemas reales (POS)
- Integración de hardware (cámara / QR)
- UX tipo aplicación comercial

==================================================

👨‍💻 AUTOR

Angel Ivan Lopez Calvillo

==================================================
