import { createContext, useState, useEffect } from "react";
import { productService } from "../services/productService";

export const StoreContext = createContext();

export function StoreProvider({ children }) {

  // 📦 productos (Firebase)
  const [products, setProducts] = useState([]);

  // 🛒 carrito cliente
  const [cart, setCart] = useState([]);

  // 🧾 orden escaneada (admin)
  const [currentOrder, setCurrentOrder] = useState(null);

  // 🔄 cargar productos desde Firestore
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    loadProducts();
  }, []);

  // ➕ agregar al carrito
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);

      if (exists) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➖ eliminar del carrito
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  // 🔁 cambiar cantidad (opcional pero PRO)
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, qty } : p
      )
    );
  };

  // 🧹 limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        // 📦 productos
        products,
        setProducts,

        // 🛒 carrito
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,

        // 🧾 orden QR
        currentOrder,
        setCurrentOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}