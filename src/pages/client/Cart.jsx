import { useContext } from "react";
import { StoreContext } from "../../context/store";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart, products } = useContext(StoreContext);
  const navigate = useNavigate();

  const items = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return { ...product, qty };
  });

  const cambiarCantidad = (id, delta) => {
    setCart(prev => {
      const nuevo = { ...prev, [id]: (prev[id] || 0) + delta };
      if (nuevo[id] <= 0) delete nuevo[id];
      return nuevo;
    });
  };

  // 🔥 Precio incluye IVA
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const subtotal = total / 1.16;
  const iva = total - subtotal;

  return (
    <div className="min-h-screen bg-crema flex justify-center">
      <div className="w-full max-w-md mx-auto px-3 flex flex-col pb-28">

        {/* HEADER */}
        <div className="bg-cafe text-white p-4 flex justify-between rounded-b-xl">
          <button onClick={() => navigate("/client/menu")}>
            ← Regresar
          </button>
          <h2 className="font-bold">Mi pedido</h2>
          <div />
        </div>

        {/* LISTA */}
        <div className="flex flex-col gap-3 mt-4">

          {items.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Tu carrito está vacío
            </p>
          )}

          {items.map(item => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-xl shadow-sm border flex items-center gap-3"
            >
              <div className="text-2xl">{item.emoji}</div>

              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  ${item.price} c/u
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => cambiarCantidad(item.id, -1)}
                  className="w-7 h-7 border rounded-full"
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => cambiarCantidad(item.id, 1)}
                  className="w-7 h-7 border rounded-full"
                >
                  +
                </button>
              </div>

              <div className="text-sm font-semibold text-cafe w-16 text-right">
                ${(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="max-w-md mx-auto">

              <div className="flex flex-col gap-1 mb-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>IVA (16%)</span>
                  <span>${iva.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg text-cafe">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* 🔥 PASAMOS LOS ITEMS AL QR */}
              <button
                onClick={() =>
                  navigate("/client/qr", {
                    state: { items }
                  })
                }
                className="w-full bg-cafe text-white py-3 rounded-xl text-lg"
              >
                Generar código QR
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}