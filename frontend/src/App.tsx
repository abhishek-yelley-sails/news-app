import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import AuthorizedRoutes from "./components/AuthorizedRoutes/AuthorizedRoutes";
import Home from "./components/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <h1>Error Root!</h1>,
    children: [
      {
        path: "/",
        element: <AuthorizedRoutes />,
        errorElement: <h1>Error AuthRoutes!</h1>,
        children: [
          {
            index: true,
            element: <Home />,
            errorElement: <h1>Error Home!</h1>,
          }
        ]
      }
    ]
  }
]
);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}