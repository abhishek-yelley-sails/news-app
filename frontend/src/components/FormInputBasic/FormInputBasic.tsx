import { FormInputBasicType } from "../../util/definitions";
import cssStyles from "./FormInputBasic.module.css";

export default function FormInputBasic({
  id,
  label,
  type = "text",
  name,
  color,
  value,
  onChange,
  ...props
}: FormInputBasicType) {
  let inputStyle: React.CSSProperties = {},
    labelStyle: React.CSSProperties = {};
  if (color) {
    inputStyle = { border: `3px solid ${color}` };
    labelStyle = { backgroundColor: `${color}` };
  }
  return (
    <div className={cssStyles.inputContainer}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
        {...props}
      />
    </div>
  );
}
