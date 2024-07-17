import { useId } from "react";
import FormInputBasic from "../FormInputBasic/FormInputBasic";

import cssStyles from "./SearchBox.module.css";

export default function SearchBox({
  value,
  handleChange,
}: {
  value?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const boxId = useId();
  return (
    <div className={cssStyles.searchContainer}>
      <FormInputBasic
        id={boxId + "-query"}
        label={"Search"}
        type={"text"}
        name={"query"}
        color={"green"}
        value={value}
        onChange={handleChange}
        placeholder={"search new articles..."}
      />
    </div>
  );
}
