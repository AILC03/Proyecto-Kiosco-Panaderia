import { useContext, useState } from "react";
import { StoreContext } from "../../context/store";

export default function Employees() {
  const { employees, setEmployees } = useContext(StoreContext);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    number: "",
    name: "",
    lastNameP: "",
    lastNameM: "",
    password: ""
  });

  const toggleEmpleado = (id) => {
    const updated = employees.map(e =>
      e.id === id ? { ...e, active: !e.active } : e
    );
    setEmployees(updated);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const editarEmpleado = (e) => {
    setForm({
      number: e.number,
      name: e.name,
      lastNameP: e.lastNameP,
      lastNameM: e.lastNameM,
      password: e.password
    });

    setEditId(e.id);
    setEditMode(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      number: "",
      name: "",
      lastNameP: "",
      lastNameM: "",
      password: ""
    });

    setEditMode(false);
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      console.log("Editar empleado:", form);

      const updated = employees.map(emp =>
        emp.id === editId ? { ...emp, ...form } : emp
      );

      setEmployees(updated);
    } else {
      console.log("Crear empleado:", form);

      const newEmployee = {
        id: Date.now(),
        ...form,
        active: true
      };

      setEmployees([...employees, newEmployee]);
    }

    resetForm();
  };

  return (
    <div className="min-h-screen bg-crema p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Empleados</h1>

        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
          }}
          className="bg-cafe text-white px-4 py-2 rounded"
        >
          + Agregar empleado
        </button>
      </div>

      {/* LISTA */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">

        {employees.map(e => (
          <div
            key={e.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">
                {e.name} {e.lastNameP}
              </p>
              <p className="text-sm text-gray-500">
                #{e.number}
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => editarEmpleado(e)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Editar
              </button>

              <button
                onClick={() => toggleEmpleado(e.id)}
                className={`px-3 py-1 rounded text-white text-sm ${
                  e.active ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                {e.active ? "Activo" : "Inactivo"}
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-lg font-bold mb-3">
              {editMode ? "Editar empleado" : "Nuevo empleado"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                name="number"
                placeholder="Número"
                value={form.number}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                name="lastNameP"
                placeholder="Apellido paterno"
                value={form.lastNameP}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                name="lastNameM"
                placeholder="Apellido materno"
                value={form.lastNameM}
                onChange={handleChange}
                className="w-full p-2 border rounded"
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

              <div className="flex gap-2 mt-4">

                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded"
                >
                  Guardar
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-400 text-white py-2 rounded"
                >
                  Cancelar
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}