import { useState } from "react";
import { FormInputType } from "../../util/definitions";
import FormInputBasic from "../FormInputBasic/FormInputBasic";

export default function FormInput(props: FormInputType) {
  const [value, setValue] = useState(props.defaultValue || "");
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  return <FormInputBasic value={value} onChange={handleChange} {...props} />;
}
