import { useEffect, useState } from "react";
import { employeeService } from "../../services/employeeService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    number: "",
    password: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 🔄 cargar empleados
  const loadEmployees = async () => {
    const data = await employeeService.getAll();
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ✏️ inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ➕ crear o editar
  const handleSubmit = async () => {
    if (!form.name || !form.number || !form.password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editingId) {
      await employeeService.update(editingId, form);
    } else {
      await employeeService.create(form);
    }

    resetForm();
    loadEmployees();
  };

  // ✏️ editar
  const handleEdit = (emp) => {
    setForm({
      name: emp.name,
      number: emp.number,
      password: emp.password
    });

    setEditingId(emp.id);
    setShowForm(true);
  };

  // 🧹 limpiar
  const resetForm = () => {
    setForm({
      name: "",
      number: "",
      password: ""
    });

    setEditingId(null);
    setShowForm(false);
  };

  // 🔁 activar/desactivar
  const toggleActive = async (emp) => {
    await employeeService.toggleActive(emp.id, emp.active);
    loadEmployees();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-lg">Empleados</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cafe text-white px-3 py-1 rounded"
        >
          + Agregar
        </button>
      </div>

      {/* FORMULARIO */}
      {showForm && (
        <div className="mb-4 space-y-2 border p-3 rounded">

          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="number"
            placeholder="Número"
            value={form.number}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-3 py-1 rounded w-full"
            >
              {editingId ? "Actualizar" : "Guardar"}
            </button>

            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-3 py-1 rounded w-full"
            >
              Cancelar
            </button>
          </div>

        </div>
      )}

      {/* LISTA */}
      <div className="space-y-2">

        {employees.length === 0 && (
          <p className="text-gray-400 text-sm">
            No hay empleados
          </p>
        )}

        {employees.map(emp => (
          <div
            key={emp.id}
            className="flex justify-between items-center border p-2 rounded"
          >

            <div>
              <p className="font-medium">{emp.name}</p>
              <p className="text-xs text-gray-500">
                #{emp.number}
              </p>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() => handleEdit(emp)}
                className="text-blue-500 text-xs"
              >
                Editar
              </button>

              <button
                onClick={() => toggleActive(emp)}
                className={`px-2 py-1 text-xs rounded ${
                  emp.active
                    ? "bg-green-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {emp.active ? "Activo" : "Inactivo"}
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}