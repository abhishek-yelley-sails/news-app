import { useQuery } from "react-query";
import NewsCard from "../NewsCard/NewsCard";
import makeRequest from "../../api/axiosInstance";
import { useAuth } from "../AuthContextProvider/useAuth";
import { NewsArticle } from "../../util/definitions";
import cssStyles from "./Home.module.css";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import CountrySelect from "../CountrySelect/CountrySelect";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import FeedTabs from "../FeedTabs/FeedTabs";

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
        <FeedTabs
          tabs={[
            {
              label: "Top",
              element: (
                <div className={cssStyles.optionsContainer}>
                  <CountrySelect
                    value={country}
                    handleChange={handleCountryChange}
                  />
                </div>
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
