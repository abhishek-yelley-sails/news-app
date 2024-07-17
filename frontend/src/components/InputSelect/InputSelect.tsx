import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useId } from "react";

export default function InputSelect({
  label,
  name,
  value,
  handleChange,
  children,
}: {
  label: string;
  name: string;
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
  children?: React.ReactNode;
}) {
  const componentId = useId();
  return (
    <Box sx={{ minWidth: 120, margin: "20px 0px 20px 0px" }}>
      <FormControl fullWidth>
        <InputLabel id={componentId + "-select-label"}>{label}</InputLabel>
        <Select
          labelId={componentId + "-select-label"}
          id={componentId + "-select"}
          value={value}
          name={name}
          label={label}
          onChange={handleChange}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
}
