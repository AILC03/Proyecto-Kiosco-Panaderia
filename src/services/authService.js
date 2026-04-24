import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const login = async (number, password) => {
  try {
    console.log("🔐 INPUT:");
    console.log("number:", number, "| type:", typeof number);
    console.log("password:", password, "| type:", typeof password);

    const snapshot = await getDocs(collection(db, "employees"));

    const employees = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("📦 EMPLOYEES FROM FIREBASE:");
    console.log(employees);

    const user = employees.find(u => {
      const matchNumber = u.number === Number(number.trim());
      const matchPassword = u.password === password.trim();
      const isActive = u.active === true;

      console.log("---- COMPARANDO ----");
      console.log("DB number:", u.number, "| INPUT:", Number(number.trim()), "| match:", matchNumber);
      console.log("DB password:", u.password, "| INPUT:", password.trim(), "| match:", matchPassword);
      console.log("Active:", u.active, "| match:", isActive);

      return matchNumber && matchPassword && isActive;
    });

    console.log("✅ MATCH RESULT:", user);

    return user || null;

  } catch (error) {
    console.error("❌ Error en login:", error);
    return null;
  }
};