import cssStyles from "./UserMenu.module.css";

export default function UserMenu() {
  return (
    <div className={cssStyles.userMenu}>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
        alt="User Profile Icon"
        className={cssStyles.profileIcon}
      />
    </div>
  );
}