import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import AuthorizedRoutes from "./components/AuthorizedRoutes/AuthorizedRoutes";
import Home from "./components/Home/Home";
import AuthContextProvider from "./components/AuthContextProvider/AuthContextProvider";
import Login from "./components/Login/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
            path: "/",
            element: <Home />,
            errorElement: <h1>Error Home!</h1>,
          },
          {
            path: "profile",
            element: <Profile />,
            errorElement: <h1>Error Profile!</h1>,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <h1>Error Login!</h1>,
      },
      {
        path: "signup",
        element: <Signup />,
        errorElement: <h1>Error Signup!</h1>,
      },
      {
        path: "about",
        element: <h1>About</h1>,
        errorElement: <h1>Error About!</h1>,
      },
    ],
  },
]);

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
