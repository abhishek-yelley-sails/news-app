import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContextProvider/useAuth";

export default function AuthorizedRoutes() {
  const authCtx = useAuth();
  if (authCtx?.isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to="login" />;
}
