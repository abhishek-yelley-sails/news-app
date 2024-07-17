import { MenuItem, SelectChangeEvent } from "@mui/material";
import InputSelect from "../InputSelect/InputSelect";

export default function CountrySelect({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
}) {
  return (
    <InputSelect
      label={"Country"}
      name={"country"}
      value={value}
      handleChange={handleChange}
    >
      <MenuItem value={"in"}>India</MenuItem>
      <MenuItem value={"us"}>America</MenuItem>
    </InputSelect>
  );
}
