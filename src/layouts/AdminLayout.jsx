import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "border-b-2 border-white font-semibold"
      : "opacity-70 hover:opacity-100";

  // 🔐 logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-crema flex flex-col">

      {/* 🔥 NAVBAR */}
      <header className="bg-cafe text-white px-4 py-3 flex justify-between items-center shadow">

        <h1 className="font-bold text-lg">
          Panadería Tecnológico        </h1>

        <div className="flex items-center gap-6">

          {/* NAV */}
          <nav className="flex gap-6 text-sm">

            <button
              onClick={() => navigate("/admin")}
              className={isActive("/admin")}
            >
              Venta
            </button>

            <button
              onClick={() => navigate("/admin/products")}
              className={isActive("/admin/products")}
            >
              Productos
            </button>


            <button
              onClick={() => navigate("/admin/Sales")}
              className={isActive("/admin/Sales")}
            >
              Ventas
            </button>

            <button
              onClick={() => navigate("/admin/employees")}
              className={isActive("/admin/employees")}
            >
              Empleados
            </button>

          </nav>

          {/* 🔴 LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Salir
          </button>

        </div>

      </header>

      {/* CONTENIDO */}
      <main className="p-4 flex-1">
        <Outlet />
      </main>

    </div>
  );
}