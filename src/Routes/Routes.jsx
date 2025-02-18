import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../component/Layout/MainLayout";
import { createBrowserRouter } from "react-router";

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
    ],
  },
]);
