import { useEffect, useState } from "react";
import { productService } from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 🔄 cargar productos
  const loadProducts = async () => {
    const data = await productService.getAll();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ✏️ manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ➕ crear o editar
  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      alert("Nombre y precio obligatorios");
      return;
    }

    if (editingId) {
      await productService.update(editingId, form);
    } else {
      await productService.create(form);
    }

    resetForm();
    loadProducts();
  };

  // ✏️ cargar datos para editar
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image || ""
    });

    setEditingId(product.id);
    setShowForm(true);
  };

  // 🧹 limpiar formulario
  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "",
      image: ""
    });

    setEditingId(null);
    setShowForm(false);
  };

  // 🔁 activar/desactivar
  const toggleActive = async (p) => {
    await productService.toggleActive(p.id, p.active);
    loadProducts();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-lg">Productos</h2>

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
            name="price"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="category"
            placeholder="Categoría"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="image"
            placeholder="URL de imagen"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* 🔥 PREVIEW */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-24 h-24 object-cover rounded"
            />
          )}

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

        {products.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center border p-2 rounded"
          >

            <div className="flex items-center gap-3">

              <img
                src={p.image || "https://via.placeholder.com/50"}
                alt={p.name}
                className="w-12 h-12 object-cover rounded"
              />

              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">
                  ${p.price} • {p.category}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() => handleEdit(p)}
                className="text-blue-500 text-xs"
              >
                Editar
              </button>

              <button
                onClick={() => toggleActive(p)}
                className={`px-2 py-1 text-xs rounded ${
                  p.active
                    ? "bg-green-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {p.active ? "Activo" : "Inactivo"}
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}