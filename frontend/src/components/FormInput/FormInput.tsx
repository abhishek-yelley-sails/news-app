import { useState } from "react";
import { FormInputType } from "../../util/definitions";
import cssStyles from "./FormInput.module.css";

export default function FormInput({
  id,
  label,
  type = "text",
  name,
  defaultValue,
  ...props
}: FormInputType) {
  const [value, setValue] = useState(defaultValue || "");
  return (
    <div className={cssStyles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </div>
  );
}
