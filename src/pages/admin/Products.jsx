import { useContext, useState } from "react";
import { StoreContext } from "../../context/store";

export default function Products() {
  const { products, setProducts } = useContext(StoreContext);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: ""
  });

  const toggleProducto = (id) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, active: !p.active } : p
    );
    setProducts(updated);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const editarProducto = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      category: p.category || "",
      image: p.image || ""
    });

    setEditId(p.id);
    setEditMode(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "",
      image: ""
    });

    setEditMode(false);
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      console.log("Editar producto:", form);

      const updated = products.map(p =>
        p.id === editId
          ? { ...p, ...form, price: Number(form.price) }
          : p
      );

      setProducts(updated);
    } else {
      console.log("Crear producto:", form);

      const newProduct = {
        id: Date.now(),
        ...form,
        price: Number(form.price),
        active: true
      };

      setProducts([...products, newProduct]);
    }

    resetForm();
  };

  return (
    <div className="min-h-screen bg-crema p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Productos</h1>

        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
          }}
          className="bg-cafe text-white px-4 py-2 rounded"
        >
          + Agregar producto
        </button>
      </div>

      {/* LISTA */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">

        {products.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">${p.price}</p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => editarProducto(p)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Editar
              </button>

              <button
                onClick={() => toggleProducto(p.id)}
                className={`px-3 py-1 rounded text-white text-sm ${
                  p.active ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                {p.active ? "Activo" : "Inactivo"}
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
              {editMode ? "Editar producto" : "Nuevo producto"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />

              <input
                name="category"
                placeholder="Categoría"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                name="image"
                placeholder="URL imagen"
                value={form.image}
                onChange={handleChange}
                className="w-full p-2 border rounded"
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