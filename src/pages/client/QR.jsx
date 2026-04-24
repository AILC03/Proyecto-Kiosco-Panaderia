import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { QRCodeCanvas } from "qrcode.react";

export default function QR() {
  const { cart, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  // 🧾 validar carrito
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <p>Carrito vacío</p>
      </div>
    );
  }

  // 💰 cálculos
  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const subtotal = total / 1.16;
  const iva = total - subtotal;

  // 📦 datos del QR
  const qrData = {
    items: cart.map(i => ({
      id: i.id,
      qty: i.qty
    })),
    subtotal,
    iva,
    total
  };

  const qrString = JSON.stringify(qrData);

  // 🔁 nuevo pedido
  const nuevoPedido = () => {
    clearCart(); // 🔥 ahora usamos context correcto
    navigate("/client/menu");
  };

  return (
    <div className="min-h-screen bg-crema flex justify-center items-center px-4">

      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full max-w-md">

        <h2 className="text-xl font-bold text-cafe mb-2">
          Pedido listo
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Muestra este código en caja
        </p>

        {/* 🔥 QR */}
        <div className="bg-white p-4 inline-block rounded-lg">
          <QRCodeCanvas value={qrString} size={180} />
        </div>

        {/* 💰 TOTAL */}
        <p className="mt-4 text-lg font-bold text-cafe">
          Total: ${total.toFixed(2)}
        </p>

        {/* 🧾 DETALLE */}
        <div className="mt-4 text-sm text-left border-t pt-3 space-y-1">
          {cart.map(i => (
            <div key={i.id} className="flex justify-between">
              <span>{i.name} x{i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* 🔁 BOTÓN */}
        <button
          onClick={nuevoPedido}
          className="mt-5 w-full bg-cafe text-white py-2 rounded-lg"
        >
          Nuevo pedido
        </button>

      </div>
    </div>
  );
}