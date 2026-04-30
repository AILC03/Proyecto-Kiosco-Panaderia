import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const ref = collection(db, "sales");

export const salesService = {

  // ➕ guardar venta
  async create(sale) {
    try {
      await addDoc(ref, {
        ...sale,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error guardando venta:", error);
    }
  },

  // 🔍 obtener ventas
  async getAll() {
    try {
      const snapshot = await getDocs(ref);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    } catch (error) {
      console.error("Error obteniendo ventas:", error);
      return [];
    }
  }

};