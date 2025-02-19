import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../component/Layout/MainLayout";
import { createBrowserRouter } from "react-router";
import EmployeeCardView from "../Pages/EmployeeCardView";
import EmployeeTableView from "../Pages/EmployeeTableView";
import Dashboard from "../Pages/Dashboard";

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
