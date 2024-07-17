import { useQuery } from "react-query";
import NewsCard from "../NewsCard/NewsCard";
import makeRequest from "../../api/axiosInstance";
import { useAuth } from "../AuthContextProvider/useAuth";
import { NewsArticle } from "../../util/definitions";
import cssStyles from "./Home.module.css";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import CountrySelect from "../CountrySelect/CountrySelect";
// import SettingsAccordian from "../SettingsAccordian/SettingsAccordian";
// import FeedSelect from "../FeedSelect/FeedSelect";
import SearchBox from "../SearchBox/SearchBox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDebouncedCallback } from "use-debounce";

export default function Home() {
  const authCtx = useAuth();
  const [country, setCountry] = useState(authCtx?.country || "us");
  const [feed, setFeed] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  function handleFeedChange(value: number) {
    setFeed(value);
  }

  let url = "";
  if (feed === 0) {
    url = "/news/top/" + country;
  } else {
    url = "/news/search?q=" + searchValue;
  }
  const query = useQuery({
    queryFn: () => {
      return makeRequest(url, null, authCtx?.getToken());
    },
    queryKey: ["news", { type: "top", country, searchValue }],
  });
  let content = <></>;
  if (query.isLoading) {
    content = <h1>Loading...</h1>;
  }
  if (query.isError) {
    content = <h1>Error fetching</h1>;
    console.log(query.error);
  }
  if (query.data) {
    content = query.data.articles
      .filter((item: NewsArticle) => item.title !== "[Removed]")
      .map((item: NewsArticle) => (
        <NewsCard
          key={item.url}
          sourceId={item.source.id}
          sourceName={item.source.name}
          url={item.url}
          author={item.author}
          title={item.title}
          description={item.description}
          image={item.urlToImage ? item.urlToImage : undefined}
          date={item.publishedAt}
        />
      ));
  }
  function handleCountryChange(event: SelectChangeEvent) {
    setCountry(event.target.value);
  }
  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchValue(term);
  }, 300);
  return (
    <main>
      <h1 style={{ textAlign: "center" }}>News Articles</h1>
      <div className={cssStyles.container}>
        <BasicTabs
          tabs={[
            {
              label: "Top",
              element: (
                <CountrySelect
                  value={country}
                  handleChange={handleCountryChange}
                />
              ),
            },
            {
              label: "Search",
              element: (
                <SearchBox handleChange={(e) => handleSearch(e.target.value)} />
              ),
            },
          ]}
          value={feed}
          handleFeedChange={handleFeedChange}
        />
      </div>
      <div className={cssStyles.container}>
        <div className={cssStyles.newsCards}>{content}</div>
      </div>
    </main>
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

function BasicTabs({
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
