import { MenuItem, SelectChangeEvent } from "@mui/material";
import InputSelect from "../InputSelect/InputSelect";

export default function FeedSelect({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
}) {
  return (
    <InputSelect
      label={"Feed"}
      name={"feed"}
      value={value}
      handleChange={handleChange}
    >
      <MenuItem value={"top"}>Top</MenuItem>
      <MenuItem value={"search"}>Search</MenuItem>
    </InputSelect>
  );
}
