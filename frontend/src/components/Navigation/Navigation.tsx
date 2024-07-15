import { NavLink } from "react-router-dom";
import cssStyles from "./Navigation.module.css";
import UserMenu from "../UserMenu/UserMenu";

export default function Navigation() {
  return (
    <header>
      <nav className={cssStyles.navbar}>
        <ul className={cssStyles.left}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
        <UserMenu />
      </nav>
    </header>
  )
}