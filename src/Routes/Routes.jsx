import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../component/Layout/MainLayout";
import { createBrowserRouter } from "react-router";
import EmployeeCardView from "../Pages/EmployeeCardView";
import Dashboard from "../Pages/Dashboard";
import EmployeeTableView from "../Pages/EmployeeTableView";
import EmployeeDetailById from "../Pages/EmployeeDetailById";
import LoginPage from "../Pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/employee-list",
        element: <EmployeeCardView />,
      },
      {
        path: "/employee/:id",
        element: <EmployeeDetailById />,
      },
      {
        path: "/employee-table",
        element: <EmployeeTableView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
