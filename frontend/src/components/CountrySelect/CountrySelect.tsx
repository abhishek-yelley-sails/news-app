import { MenuItem, SelectChangeEvent } from "@mui/material";
import InputSelect from "../InputSelect/InputSelect";

export default function CountrySelect({
  country,
  handleChange,
}: {
  country: string;
  handleChange: (event: SelectChangeEvent) => void;
}) {
  return (
    <InputSelect
      label={"Country"}
      name={"country"}
      value={country}
      handleChange={handleChange}
    >
      <MenuItem value={"in"}>India</MenuItem>
      <MenuItem value={"us"}>America</MenuItem>
    </InputSelect>
  );
}
