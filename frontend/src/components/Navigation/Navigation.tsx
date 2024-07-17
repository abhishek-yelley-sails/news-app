import { NavLink } from "react-router-dom";
import cssStyles from "./Navigation.module.css";
import UserMenu from "../UserMenu/UserMenu";
import { useAuth } from "../AuthContextProvider/useAuth";

export default function Navigation() {
  const authCtx = useAuth();
  return (
    <header className={cssStyles.header}>
      <nav className={cssStyles.navbar}>
        <ul className={cssStyles.left}>
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? cssStyles.active : isPending ? cssStyles.pending : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isActive ? cssStyles.active : isPending ? cssStyles.pending : ""
              }
            >
              About
            </NavLink>
          </li>
        </ul>
        {authCtx?.isLoggedIn && <UserMenu />}
      </nav>
    </header>
  );
}
