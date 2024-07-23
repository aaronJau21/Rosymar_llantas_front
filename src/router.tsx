import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "./auth/pages/Login";
import { Home } from "./Home/page/Home";
import { ServicesLayout } from "./services-home/layout/ServicesLayout";
import { Trucks } from "./services-home/pages/Truck/Trucks";
import { Users } from "./services-home/pages/users/Users";
import { Tire } from "./services-home/pages/tire/Tire";
import ProtectedRoute from "./global/store/ProtectedRoute";
import { CreateTruck } from './services-home/pages/Truck/CreateTruck';

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
    ],
  },
]);
