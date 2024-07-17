import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SettingsAccordian({
  accordian,
  handleChange,
  children,
}: {
  accordian: boolean;
  handleChange: (event: React.SyntheticEvent, expanded: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <Accordion expanded={accordian} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>Settings</Typography>
        {/* <Typography sx={{ color: "text.secondary" }}>
          General Settings
        </Typography> */}
      </AccordionSummary>
      <AccordionDetails sx={{ width: "60vw" }}>{children}</AccordionDetails>
    </Accordion>
  );
}
