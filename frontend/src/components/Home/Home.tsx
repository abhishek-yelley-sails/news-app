import { useQuery } from "react-query";
import NewsCard from "../NewsCard/NewsCard";
import makeRequest from "../../api/axiosInstance";
import { useAuth } from "../AuthContextProvider/useAuth";
import { NewsArticle } from "../../util/definitions";
import cssStyles from "./Home.module.css";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import CountrySelect from "../CountrySelect/CountrySelect";

export default function Home() {
  const authCtx = useAuth();
  const [country, setCountry] = useState(authCtx?.country || "us");
  const query = useQuery({
    queryFn: () => {
      return makeRequest("/news/top/" + country, null, authCtx?.getToken());
    },
    queryKey: ["news", { type: "top", country }],
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
  function handleChange(event: SelectChangeEvent) {
    setCountry(event.target.value);
  }
  return (
    <main>
      <h1 style={{ textAlign: "center" }}>News Articles</h1>
      <div className={cssStyles.optionsContainer}>
        <CountrySelect country={country} handleChange={handleChange} />
      </div>
      <div className={cssStyles.container}>
        <div className={cssStyles.newsCards}>{content}</div>
      </div>
    </main>
  );
}
