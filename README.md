🥐 Panadería POS App

Sistema de punto de venta (POS) desarrollado con React para una cafetería/panadería.

--------------------------------------------------

🚀 DEMO

(Agrega aquí tu link cuando hagas deploy)

--------------------------------------------------

🧾 DESCRIPCIÓN

Aplicación web que permite a clientes generar pedidos mediante QR y a cajeros procesarlos en una interfaz tipo punto de venta (POS).

--------------------------------------------------

⚙️ FUNCIONALIDADES

👤 Cliente
- Visualización de productos
- Carrito de compra
- Generación de código QR

🧑‍💼 Administrador
- Login de empleados
- Escaneo de QR
- Venta manual (tipo caja)
- Gestión de productos (CRUD)
- Gestión de empleados (CRUD)
- Generación de ticket
- Impresión de ticket

--------------------------------------------------

🔄 FLUJO DEL SISTEMA

1. Cliente selecciona productos
2. Se genera un QR con la orden
3. Cajero escanea el QR
4. Se carga la venta en el sistema
5. Puede modificar o agregar productos
6. Finaliza la venta
7. Se genera ticket

--------------------------------------------------

🛠️ TECNOLOGÍAS

- React
- Vite
- TailwindCSS
- React Router
- html5-qrcode

--------------------------------------------------

📂 ESTRUCTURA DEL PROYECTO

src/
│
├── pages/
│   ├── client/
│   └── admin/
│
├── components/
├── layouts/
├── context/
├── services/

--------------------------------------------------

🔐 AUTENTICACIÓN

Sistema básico de login basado en empleados almacenados en localStorage.

--------------------------------------------------

📸 CAPTURAS

(Aquí puedes agregar imágenes del sistema)

--------------------------------------------------

🚀 INSTALACIÓN

git clone https://github.com/TU_USUARIO/TU_REPO.git
cd panaderia-app
npm install
npm run dev

--------------------------------------------------

📱 RUTAS

Cliente: /client/menu
Admin: /admin/login

--------------------------------------------------

🔐 CREDENCIALES DE PRUEBA

Empleado: 123
Contraseña: 123

--------------------------------------------------

🚀 PRÓXIMAS MEJORAS

- Historial de ventas
- Backend con base de datos
- Roles de usuario
- Reportes
- Integración con pagos

--------------------------------------------------

👨‍💻 AUTOR

Angel Ivan Lopez Calvillo
