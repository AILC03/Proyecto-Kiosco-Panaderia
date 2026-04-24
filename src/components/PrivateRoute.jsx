import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");

  // 🔐 si NO hay usuario → manda a login
  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  // ✔ si hay usuario → deja pasar
  return children;
}