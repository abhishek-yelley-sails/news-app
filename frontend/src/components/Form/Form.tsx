import { Link } from "react-router-dom";
import cssStyles from "./Form.module.css";
import { LoginResponseFailed } from "../../util/definitions";

export default function Form({
  type,
  onSubmit,
  errors,
  isLoading,
  children,
}: {
  type: "signup" | "login" | "form";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: LoginResponseFailed | null;
  isLoading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cssStyles.formContainer}>
      <form className={cssStyles.form} onSubmit={onSubmit}>
        {children}
        <div className={cssStyles.buttonContainer}>
          <button
            type="submit"
            className={
              cssStyles.button + (isLoading ? " " + cssStyles.loading : "")
            }
            disabled={isLoading}
          >
            {type === "login"
              ? "Login"
              : type === "signup"
              ? "Signup"
              : "Submit"}
          </button>
        </div>
        <div className={cssStyles.switchLink}>
          {type !== "form" && (
            <Link to={type === "signup" ? "/login" : "/signup"}>
              {type === "signup"
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}
            </Link>
          )}
        </div>
      </form>
      {errors && (
        <p style={{ fontWeight: 500, color: "red", textAlign: "center" }}>
          {errors.message}
        </p>
      )}
      {errors?.errors &&
        Object.values(errors.errors).map((item: string) => (
          <p
            key={item}
            style={{ fontWeight: 500, color: "red", textAlign: "center" }}
          >
            {item}
          </p>
        ))}
    </div>
  );
}
