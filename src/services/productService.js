import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

// 📦 referencia
const ref = collection(db, "products");

export const productService = {

  // 🔍 obtener productos
  async getAll() {
    try {
      const snapshot = await getDocs(ref);

      return snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));

    } catch (error) {
      console.error("Error obteniendo productos:", error);
      return [];
    }
  },

  // ➕ crear producto
  async create(product) {
    try {
      const newProduct = {
        name: product.name || "",
        price: Number(product.price),
        category: product.category || "General",
        image: product.image || "",
        active: true
      };

      await addDoc(ref, newProduct);

    } catch (error) {
      console.error("Error creando producto:", error);
    }
  },

  // ✏️ actualizar producto
  async update(id, data) {
    try {
      const docRef = doc(db, "products", id);

      const updatedData = {
        ...data
      };

      // 🔥 asegurar tipo correcto
      if (data.price !== undefined) {
        updatedData.price = Number(data.price);
      }

      await updateDoc(docRef, updatedData);

    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  },

  // 🔁 activar / desactivar
  async toggleActive(id, currentState) {
    try {
      const docRef = doc(db, "products", id);

      await updateDoc(docRef, {
        active: !currentState
      });

    } catch (error) {
      console.error("Error cambiando estado:", error);
    }
  }
};