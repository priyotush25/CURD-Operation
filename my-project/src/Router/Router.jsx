import { createBrowserRouter } from "react-router";
import Update from "../Component/Update";
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
      {
        path: "update/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),

        element: <Update />,
      },
    ],
  },
]);

export default Router;
