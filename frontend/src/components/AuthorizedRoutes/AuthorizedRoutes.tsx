import { Navigate, Outlet } from "react-router-dom";

export default function AuthorizedRoutes() {
  const isLoggedIn = true; // check from token and ctx
  if (isLoggedIn) {
    return (
      <Outlet />
    )
  }
  return (
    <Navigate to="login" />
  )
}