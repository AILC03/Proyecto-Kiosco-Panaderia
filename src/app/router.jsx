import { createBrowserRouter, Navigate } from "react-router-dom";

// páginas
import Home from "../pages/Home";

// cliente
import Menu from "../pages/client/Menu";
import Cart from "../pages/client/Cart";
import QR from "../pages/client/QR";

// admin
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Employees from "../pages/admin/Employees";
import Login from "../pages/admin/Login";
import Sales from "../pages/admin/Sales";

// protección
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  // CLIENTE
  {
    path: "/client/menu",
    element: <Menu />,
  },
  {
    path: "/client/cart",
    element: <Cart />,
  },
  {
    path: "/client/qr",
    element: <QR />,
  },

  // 🔐 LOGIN ADMIN
  {
    path: "/admin/login",
    element: <Login />,
  },

  // 🔒 ADMIN PROTEGIDO
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "employees",
        element: <Employees />
      },
      {
        path: "sales",
        element: <Sales />
      }
    ]
  },

  // 🔥 REDIRECCIÓN GLOBAL (evita 404)
  {
    path: "*",
    element: <Navigate to="/admin/login" />
  }
]);