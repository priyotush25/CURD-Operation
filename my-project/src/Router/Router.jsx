import { createBrowserRouter } from "react-router";
import UserForm from "../Component/UserForm";
import MainLayout from "../MainLayout/MainLayout";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <UserForm />,
      },
    ],
  },
]);

export default Router;
