import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/store";

export default function Login() {
  const { employees } = useContext(StoreContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    number: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = employees.find(
      emp =>
        emp.number === form.number &&
        emp.password === form.password &&
        emp.active
    );

    if (!user) {
      setError("Credenciales incorrectas");
      return;
    }

    // 🔥 guardar sesión
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-crema">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login Admin
        </h2>

        <form onSubmit={handleLogin} className="space-y-3">

          <input
            name="number"
            placeholder="Número de empleado"
            value={form.number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-cafe text-white py-2 rounded"
          >
            Entrar
          </button>

        </form>

      </div>
    </div>
  );
}