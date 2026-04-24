import { useContext, useState } from "react";
import { StoreContext } from "../../context/store";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const { products, cart, setCart } = useContext(StoreContext);
  const [categoria, setCategoria] = useState("Todo");
  const navigate = useNavigate();

  const categorias = ["Todo", ...new Set(products.map(p => p.category))];

  const visibles =
    categoria === "Todo"
      ? products.filter(p => p.active)
      : products.filter(p => p.category === categoria && p.active);

  const agregar = (producto) => {
    setCart(prev => ({
      ...prev,
      [producto.id]: (prev[producto.id] || 0) + 1
    }));
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const totalPrecio = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find(x => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-crema flex justify-center">

      <div className="w-full max-w-md mx-auto px-3 flex flex-col relative pb-28">

        {/* HEADER */}
        <div className="bg-cafe text-white p-4 flex items-center gap-3 rounded-b-xl">
          <span className="text-3xl">🥖</span>
          <div>
            <h1 className="text-lg font-bold">La Panadería</h1>
            <p className="text-xs opacity-80">Ordena y recoge en caja</p>
          </div>
        </div>

        {/* CATEGORÍAS */}
        <div className="flex gap-2 py-3 overflow-x-auto">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap
                ${categoria === cat
                  ? "bg-cafe text-white"
                  : "border border-borde text-gray-600"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTOS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-4">
          {visibles.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-sm border border-borde p-3 flex flex-col"
            >
              <div className="h-20 flex items-center justify-center text-3xl bg-cafe-cl rounded-md">
                {p.emoji}
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-cafe text-sm font-semibold">
                  ${p.price}
                </p>
              </div>

              {/* BOTÓN CORREGIDO */}
              <button
                onClick={() => agregar(p)}
                className="mt-2 py-1 rounded text-sm bg-cafe text-white hover:bg-cafe-osc transition"
              >
                {cart[p.id] ? `Agregar (${cart[p.id]})` : "Agregar"}
              </button>
            </div>
          ))}
        </div>

        {/* BARRA CARRITO */}
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

              <span className="font-semibold">${totalPrecio.toFixed(2)}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}