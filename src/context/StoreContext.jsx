import { useState } from "react";
import { StoreContext } from "./store";
import { productService } from "../services/productService";
import { employeeService } from "../services/employeeService";

export function StoreProvider({ children }) {

  const [products, setProducts] = useState(() => productService.getAll());
  const [employees] = useState(() => employeeService.getAll());
  const [cart, setCart] = useState({});
  const [currentOrder, setCurrentOrder] = useState(null);

  return (
    <StoreContext.Provider value={{
      products,
      setProducts,
      employees,
      cart,
      setCart,
      currentOrder,
      setCurrentOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
}