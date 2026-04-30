import { useEffect, useState } from "react";
import { salesService } from "../../services/salesService";
const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [productFilter, setProductFilter] = useState("");

  
  // 🔥 formatear fecha segura
  const formatDate = (date) => {
    if (!date) return "Sin fecha";

    if (date.toDate) {
      return date.toDate().toLocaleString();
    }

    return new Date(date).toLocaleString();
  };

  // 🔄 cargar ventas
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await salesService.getAll();
        setSales(data);
      } catch (error) {
        console.error("Error cargando ventas:", error);
      }
    };

    fetchSales();
  }, []);

  // 🔍 FILTROS
  const filteredSales = sales.filter((sale) => {
    // 📅 filtro por fecha
    if (selectedDate) {
      const saleDate = sale.createdAt?.toDate?.();
      const formatted = saleDate?.toISOString().split("T")[0];

      if (formatted !== selectedDate) return false;
    }

    // 🔎 filtro por producto
    if (productFilter) {
      const match = sale.items?.some((item) =>
        item.name.toLowerCase().includes(productFilter.toLowerCase())
      );

      if (!match) return false;
    }

    return true;
  });

  // 💰 total filtrado
  const totalDia = filteredSales.reduce(
    (acc, s) => acc + (s.total || 0),
    0
  );

  // 🔄 reiniciar filtros
  const resetFilters = () => {
    setSelectedDate(getToday());
    setProductFilter("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="font-bold text-lg mb-4">
        Ventas
      </h2>

      {/* 🔍 FILTROS */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Filtrar por producto..."
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={resetFilters}
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
        >
          Reiniciar filtros
        </button>

      </div>

      {/* 💰 TOTAL */}
      <p className="mb-3 font-semibold text-cafe">
        Total: ${totalDia.toFixed(2)}
      </p>

      {/* LISTA */}
      {filteredSales.length === 0 && (
        <p className="text-gray-400">
          No hay ventas para estos filtros
        </p>
      )}

      <div className="space-y-3">

        {filteredSales.map((sale) => (
          <div
            key={sale.id}
            className="border p-3 rounded-lg shadow-sm"
          >

            <p className="font-semibold text-cafe">
              Total: ${sale.total?.toFixed(2) || "0.00"}
            </p>

            <p className="text-xs text-gray-500">
              {formatDate(sale.createdAt)}
            </p>

            <div className="mt-2 text-sm space-y-1">

              {sale.items?.length > 0 ? (
                sale.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} x{item.qty}
                    </span>

                    <span>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-xs">
                  Sin productos
                </p>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}