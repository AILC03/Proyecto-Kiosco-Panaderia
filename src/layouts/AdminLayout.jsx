import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

const isActive = (path) =>
  location.pathname.startsWith(path)
    ? "bg-cafe text-white"
    : "text-cafe";

  return (
    <div className="flex h-screen bg-crema">

      {/* 🟤 SIDEBAR */}
      <aside className="w-56 bg-white shadow-md p-4">

        <h2 className="text-lg font-bold mb-6 text-cafe">
          Admin
        </h2>

        <button
          onClick={() => navigate("/admin")}
          className={`block w-full text-left px-3 py-2 rounded mb-2 ${isActive("/admin")}`}
        >
          🧾 Venta
        </button>

        <button
          onClick={() => navigate("/admin/products")}
          className={`block w-full text-left px-3 py-2 rounded mb-2 ${isActive("/admin/products")}`}
        >
          📦 Productos
        </button>

        <button
          onClick={() => navigate("/admin/employees")}
          className={`block w-full text-left px-3 py-2 rounded ${isActive("/admin/employees")}`}
        >
          👨‍💼 Empleados
        </button>

      </aside>

      {/* ⚪ CONTENIDO */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}