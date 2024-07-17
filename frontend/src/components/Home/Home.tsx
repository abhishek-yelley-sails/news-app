import { useQuery } from "react-query";
import NewsCard from "../NewsCard/NewsCard";
import makeRequest from "../../api/axiosInstance";
import { useAuth } from "../AuthContextProvider/useAuth";
import { NewsArticle } from "../../util/definitions";
import cssStyles from "./Home.module.css";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import CountrySelect from "../CountrySelect/CountrySelect";
import SettingsAccordian from "../SettingsAccordian/SettingsAccordian";
import FeedSelect from "../FeedSelect/FeedSelect";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";

export default function Home() {
  const authCtx = useAuth();
  const [country, setCountry] = useState(authCtx?.country || "us");
  const [feed, setFeed] = useState("top");
  const [accordian, setAccordian] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  let url = "";
  if (feed === "top") {
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
  function handleFeedChange(event: SelectChangeEvent) {
    setFeed(event.target.value);
    setSearchValue("");
  }
  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchValue(term);
  }, 300);
  function handleAccordianChange(
    event: React.SyntheticEvent,
    expanded: boolean
  ) {
    event;
    setAccordian(expanded);
  }
  return (
    <main>
      <h1 style={{ textAlign: "center" }}>News Articles</h1>
      <div className={cssStyles.container}>
        <SettingsAccordian
          accordian={accordian}
          handleChange={handleAccordianChange}
        >
          <div className={cssStyles.optionsContainer}>
            <FeedSelect value={feed} handleChange={handleFeedChange} />
          </div>
          {feed === "top" && (
            <CountrySelect value={country} handleChange={handleCountryChange} />
          )}
          {feed === "search" && (
            <SearchBox handleChange={(e) => handleSearch(e.target.value)} />
          )}
        </SettingsAccordian>
      </div>
      <div className={cssStyles.container}>
        <div className={cssStyles.newsCards}>{content}</div>
      </div>
    </main>
  );
}
