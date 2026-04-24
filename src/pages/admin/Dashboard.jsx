import { useContext, useState } from "react";
import { StoreContext } from "../../context/store";
import Scanner from "./Scanner";
import Ticket from "../../components/Ticket";

export default function Dashboard() {
  const { products } = useContext(StoreContext);

  // 🧾 carrito
  const [cart, setCart] = useState([]);

  // 🔍 búsqueda
  const [search, setSearch] = useState("");

  // 🧾 ticket
  const [showTicket, setShowTicket] = useState(false);

  // 📷 cuando escanea QR
  const handleScan = (order) => {
    const items = order.items.map(i => {
      const product = products.find(p => p.id === i.id);
      return { ...product, qty: i.qty };
    });

    setCart(items);
  };

  // ➕ agregar producto
  const addProduct = (product) => {
    const exists = cart.find(p => p.id === product.id);

    if (exists) {
      setCart(cart.map(p =>
        p.id === product.id
          ? { ...p, qty: p.qty + 1 }
          : p
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ➖ eliminar producto
  const removeProduct = (id) => {
    setCart(cart.filter(p => p.id !== id));
  };

  // 💰 cálculos
  const total = cart.reduce((acc, p) => acc + p.price * p.qty, 0);
  const subtotal = total / 1.16;
  const iva = total - subtotal;

  // ✅ finalizar
  const finalizar = () => {
    if (cart.length === 0) return;
    setShowTicket(true);
  };

  // 🔍 filtrar productos
  const filteredProducts = products.filter(p =>
    p.active &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">

      {/* 🧾 VENTA */}
      <div className="bg-white p-4 rounded-xl shadow">

        <h2 className="font-bold mb-3">Venta</h2>

        {cart.length === 0 && (
          <p className="text-gray-400 text-sm">
            No hay productos en la venta
          </p>
        )}

        {/* LISTA */}
        {cart.map(p => (
          <div key={p.id} className="flex justify-between items-center text-sm mb-1">

            <span>{p.name} x{p.qty}</span>

            <div className="flex items-center gap-2">
              <span>${(p.price * p.qty).toFixed(2)}</span>

              <button
                onClick={() => removeProduct(p.id)}
                className="text-red-500 text-xs"
              >
                ✕
              </button>
            </div>

          </div>
        ))}

        <hr className="my-3" />

        {/* TOTALES */}
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>IVA: ${iva.toFixed(2)}</p>

        <p className="font-bold text-lg text-cafe">
          Total: ${total.toFixed(2)}
        </p>

        <button
          onClick={finalizar}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
          disabled={cart.length === 0}
        >
          Finalizar venta
        </button>

      </div>

      {/* 🛒 PRODUCTOS */}
      <div className="bg-white p-4 rounded-xl shadow">

        <h2 className="font-bold mb-3">Agregar productos</h2>

        {/* BUSCADOR */}
        <input
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        {/* LISTA */}
        <div className="max-h-80 overflow-auto space-y-2">

          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{p.name}</span>

              <button
                onClick={() => addProduct(p)}
                className="bg-cafe text-white px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          ))}

        </div>

      </div>

      {/* 📷 SCANNER */}
      <div className="md:col-span-2 bg-white p-4 rounded-xl shadow">
        <Scanner onScan={handleScan} />
      </div>

      {/* 🧾 MODAL TICKET */}
      {showTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white p-4 rounded-xl">

            <Ticket
              cart={cart}
              subtotal={subtotal}
              iva={iva}
              total={total}
            />

            <button
              onClick={() => window.print()}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
            >
              Imprimir
            </button>

            <button
              onClick={() => {
                setShowTicket(false);
                setCart([]);
              }}
              className="mt-2 w-full bg-green-600 text-white py-2 rounded"
            >
              Nueva venta
            </button>

          </div>

        </div>
      )}

    </div>
  );
}