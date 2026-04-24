import { initialProducts } from "../data/products";

const KEY = "products";

export const productService = {
  getAll() {
    const data = localStorage.getItem(KEY);
    if (!data) {
      localStorage.setItem(KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(data);
  },

  save(products) {
    localStorage.setItem(KEY, JSON.stringify(products));
  },

  toggleActive(id) {
    const products = this.getAll().map(p =>
      p.id === id ? { ...p, active: !p.active } : p
    );
    this.save(products);
    return products;
  }
};