import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../component/Layout/MainLayout";
import { createBrowserRouter } from "react-router";
import EmployeeCardView from "../Pages/EmployeeCardView";
import Dashboard from "../Pages/Dashboard";
import EmployeeTableView from "../Pages/EmployeeTableView";

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
        path: "/employee-table",
        element: <EmployeeTableView />,
      },
    ],
  },
]);
