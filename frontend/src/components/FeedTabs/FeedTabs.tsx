import { Box, Tabs, Tab } from "@mui/material";

export default function FeedTabs({
  tabs,
  value,
  handleFeedChange,
}: {
  tabs: Array<{ label: string; element: React.ReactNode }>;
  value: number;
  handleFeedChange: (value: number) => void;
}) {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event;
    handleFeedChange(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Feed Selection Tab"
        >
          {tabs.map(
            (
              tab: { label: string; element: React.ReactNode },
              index: number
            ) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            )
          )}
        </Tabs>
      </Box>
      {tabs.map(
        (tab: { label: string; element: React.ReactNode }, index: number) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.element}
          </CustomTabPanel>
        )
      )}
    </Box>
  );
}

function CustomTabPanel(props: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
