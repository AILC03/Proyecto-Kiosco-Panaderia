export default function Ticket({ cart, subtotal, iva, total }) {
  const fecha = new Date().toLocaleString();

  return (
    <div className="bg-white p-4 rounded shadow w-80 mx-auto">

      <h2 className="text-center font-bold text-lg">
        Panadería Tecnològico
      </h2>

      <p className="text-center text-xs mb-3">
        {fecha}
      </p>

      <hr className="my-2" />

      {/* PRODUCTOS */}
      {cart.map((p, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span>{p.name} x{p.qty}</span>
          <span>${(p.price * p.qty).toFixed(2)}</span>
        </div>
      ))}

      <hr className="my-2" />

      {/* TOTALES */}
      <div className="text-sm">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>

        <p className="flex justify-between">
          <span>IVA</span>
          <span>${iva.toFixed(2)}</span>
        </p>

        <p className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </p>
      </div>

      <p className="text-center text-xs mt-3">
        Gracias por su compra
      </p>

    </div>
  );
}