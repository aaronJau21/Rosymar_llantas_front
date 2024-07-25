import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "./auth/pages/Login";
import { Home } from "./Home/page/Home";
import { ServicesLayout } from "./services-home/layout/ServicesLayout";
import { Trucks } from "./services-home/pages/Truck/Trucks";
import { Users } from "./services-home/pages/users/Users";
import { Tire } from "./services-home/pages/tire/Tire";
import ProtectedRoute from "./global/store/ProtectedRoute";
import { CreateTruck } from "./services-home/pages/Truck/CreateTruck";
import { CreateTire } from "./services-home/pages/tire/CreateTire";
import { CreateBrandTire } from "./services-home/pages/tire/brand/CreateBrandTire";
import { CreateUser } from "./services-home/pages/users/CreateUser";
import { EditUser } from "./services-home/pages/users/EditUser";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "home",
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: "",
    element: <Navigate to="login" />,
  },
  {
    path: "services",
    element: <ProtectedRoute element={<ServicesLayout />} />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/create",
        element: <CreateUser />,
      },
      {
        path: "users/:id",
        element: <EditUser />,
      },
      {
        path: "trucks",
        element: <Trucks />,
      },
      {
        path: "trucks/create",
        element: <CreateTruck />,
      },
      {
        path: "tire",
        element: <Tire />,
      },
      {
        path: "tire/create",
        element: <CreateTire />,
      },
      {
        path: "tire/create/brand",
        element: <CreateBrandTire />,
      },
    ],
  },
]);
