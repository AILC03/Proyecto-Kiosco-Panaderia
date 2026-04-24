import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

// 📦 referencia
const ref = collection(db, "employees");

export const employeeService = {

  // 🔍 obtener empleados
  async getAll() {
    try {
      const snapshot = await getDocs(ref);

      return snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));

    } catch (error) {
      console.error("Error obteniendo empleados:", error);
      return [];
    }
  },

  // ➕ crear empleado
  async create(employee) {
    try {
      const newEmployee = {
        name: employee.name || "",
        number: Number(employee.number), // 🔥 importante
        password: employee.password || "",
        active: true
      };

      await addDoc(ref, newEmployee);

    } catch (error) {
      console.error("Error creando empleado:", error);
    }
  },

  // ✏️ actualizar empleado
  async update(id, data) {
    try {
      const docRef = doc(db, "employees", id);

      await updateDoc(docRef, {
        ...data,
        number:
          data.number !== undefined
            ? Number(data.number)
            : undefined
      });

    } catch (error) {
      console.error("Error actualizando empleado:", error);
    }
  },

  // 🔁 activar / desactivar
  async toggleActive(id, currentState) {
    try {
      const docRef = doc(db, "employees", id);

      await updateDoc(docRef, {
        active: !currentState
      });

    } catch (error) {
      console.error("Error cambiando estado:", error);
    }
  }
};