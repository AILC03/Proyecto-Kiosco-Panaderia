import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const ref = collection(db, "sales");

export const salesService = {

  async create(sale) {
    try {
      await addDoc(ref, {
        ...sale,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error guardando venta:", error);
    }
  }

};