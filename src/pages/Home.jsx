import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-crema gap-6">

      <h1 className="text-2xl font-bold text-cafe">
        Bienvenido
      </h1>

      {/* CLIENTE */}
      <button
        onClick={() => navigate("/client/menu")}
        className="bg-cafe text-white px-6 py-3 rounded-lg text-lg w-64"
      >
        Entrar como Cliente
      </button>

      {/* ADMIN */}
      <button
        onClick={() => navigate("/admin/login")}
        className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg w-64"
      >
        Entrar como Admin
      </button>

    </div>
  );
}