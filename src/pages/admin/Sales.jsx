import { useEffect, useState } from "react";
import { salesService } from "../../services/salesService";

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
  const fetchSales = async () => {
    const data = await salesService.getAll();
    setSales(data);
  };

  fetchSales();
}, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="font-bold text-lg mb-4">
        Ventas
      </h2>

      {sales.length === 0 && (
        <p className="text-gray-400">No hay ventas</p>
      )}

      <div className="space-y-3">

        {sales.map(sale => (
          <div
            key={sale.id}
            className="border p-3 rounded"
          >
            <p className="font-semibold">
              Total: ${sale.total.toFixed(2)}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(sale.createdAt.seconds * 1000).toLocaleString()}
            </p>

            <div className="mt-2 text-sm">
              {sale.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x{item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}