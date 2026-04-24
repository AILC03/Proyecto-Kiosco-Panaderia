import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await login(number, password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-crema">
      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h2 className="text-lg font-bold mb-4 text-center">
          Login Admin
        </h2>

        <input
          placeholder="Número"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cafe text-white py-2 rounded"
        >
          Entrar
        </button>

      </div>
    </div>
  );
}