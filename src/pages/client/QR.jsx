import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/store";
import { QRCodeCanvas } from "qrcode.react";

export default function QR() {
  const { setCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const items = location.state?.items || [];

  // Totales (precio incluye IVA)
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const subtotal = total / 1.16;
  const iva = total - subtotal;

  const qrData = {
    items: items.map(i => ({
      id: i.id,
      qty: i.qty
    })),
    subtotal,
    iva,
    total
  };

  const qrString = JSON.stringify(qrData);

  const nuevoPedido = () => {
    setCart({});
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

        {/* 🔥 QR FUNCIONAL */}
        <div className="bg-white p-4 inline-block rounded-lg">
          <QRCodeCanvas value={qrString} size={180} />
        </div>

        <p className="mt-4 text-lg font-bold text-cafe">
          Total: ${total.toFixed(2)}
        </p>

        <div className="mt-4 text-sm text-left border-t pt-3 space-y-1">
          {items.map(i => (
            <div key={i.id} className="flex justify-between">
              <span>{i.name} x{i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

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