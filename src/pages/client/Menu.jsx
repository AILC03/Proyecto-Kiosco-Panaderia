import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const { products, cart, addToCart } = useContext(StoreContext);
  const [categoria, setCategoria] = useState("Todo");
  const navigate = useNavigate();

  // 🧠 categorías seguras (evita undefined)
  const categorias = [
    "Todo",
    ...new Set(products.map(p => p.category || "Sin categoría"))
  ];

  // 🧠 productos visibles
  const visibles =
    categoria === "Todo"
      ? products.filter(p => p.active)
      : products.filter(
          p =>
            (p.category || "Sin categoría") === categoria &&
            p.active
        );

  // ➕ agregar (usa context correcto)
  const agregar = (producto) => {
    addToCart(producto);
  };

  // 🧮 total items (cart es array)
  const totalItems = cart.reduce((sum, p) => sum + p.qty, 0);

  // 💰 total precio
  const totalPrecio = cart.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  return (
    <div className="min-h-screen bg-crema flex justify-center">
      <div className="w-full max-w-md mx-auto px-3 flex flex-col relative pb-28">

        {/* HEADER */}
        <div className="bg-cafe text-white p-4 flex justify-between items-center rounded-b-xl">

  {/* IZQUIERDA */}
  <button
    onClick={() => navigate("/")}
    className="text-sm"
  >
    ← Salir
  </button>

  {/* CENTRO */}
  <div className="flex items-center gap-2">
    <span className="text-2xl">🥖</span>
    <h1 className="text-lg font-bold">Panadería Tecnológico</h1>
  </div>

  {/* ESPACIO */}
  <div className="w-10" />

</div>

        {/* CATEGORÍAS */}
        <div className="flex gap-2 py-3 overflow-x-auto">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap
                ${
                  categoria === cat
                    ? "bg-cafe text-white"
                    : "border border-borde text-gray-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTOS */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          {visibles.map(p => {
            const item = cart.find(x => x.id === p.id);

            return (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm border border-borde p-3 flex flex-col"
              >
                <div className="h-20">
  <img
    src={p.image || "https://via.placeholder.com/80"}
    alt={p.name}
    className="w-full h-full object-cover rounded-md"
  />
</div>

                <div className="mt-2">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-cafe text-sm font-semibold">
                    ${p.price}
                  </p>
                </div>

                <button
                  onClick={() => agregar(p)}
                  className="mt-2 py-1 rounded text-sm bg-cafe text-white"
                >
                  {item ? `Agregar (${item.qty})` : "Agregar"}
                </button>
              </div>
            );
          })}
        </div>

        {/* CARRITO */}
        {totalItems > 0 && (
          <div
            onClick={() => navigate("/client/cart")}
            className="fixed bottom-4 left-0 right-0 px-3"
          >
            <div className="max-w-md mx-auto bg-cafe text-white p-4 rounded-xl flex justify-between items-center shadow-lg cursor-pointer">
              
              <div className="flex items-center gap-2">
                <span className="bg-white text-cafe w-6 h-6 flex items-center justify-center rounded-full text-sm">
                  {totalItems}
                </span>
                <span>Ver pedido</span>
              </div>

              <span className="font-semibold">
                ${totalPrecio.toFixed(2)}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}