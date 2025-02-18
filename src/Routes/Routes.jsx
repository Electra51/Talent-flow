import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../component/Layout/MainLayout";
import { createBrowserRouter } from "react-router";
import EmployeeCardView from "../Pages/EmployeeCardView";
import EmployeeTableView from "../Pages/EmployeeTableView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
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
