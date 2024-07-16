import cssStyles from "./NewsCard.module.css";
import { NewsCardProps, NewsCardModalHandle } from "../../util/definitions";
import NewsCardModal from "../NewsCardModal/NewsCardModal";
import { useRef } from "react";

export default function NewsCard(props: NewsCardProps) {
  const { sourceId, sourceName, author, title, description, url, image, date } =
    props;
  const newsCardModalRef = useRef<NewsCardModalHandle | null>(null);
  const dateObj = new Date(date);
  const finalDate = date
    ? `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`
    : "";
  return (
    <>
      {/* Worry if this needs to be moved to Home.tsx */}
      <NewsCardModal ref={newsCardModalRef} {...props} />
      <div className={cssStyles.newsCardContainer}>
        <div
          className={cssStyles.newsCard}
          onClick={() => newsCardModalRef.current?.open()}
        >
          <div className={cssStyles.newsCardImageContainer}>
            <img
              src={image ? image : "/posterNotFound.webp"}
              alt={title + " article image"}
              className={cssStyles.newsCardImage}
            />
          </div>
          <div className={cssStyles.newsCardInfo}>
            <h2>{title}</h2>
            <p title={sourceId}>
              <strong>Publisher: {sourceName}</strong>
            </p>
            <p>
              <strong>Author: {author ? author : "<unknown>"}</strong>
            </p>
            <p>{finalDate}</p>
            <p>{description}</p>
          </div>
        </div>
        <a href={url} target={"_blank"}>
          <div className={cssStyles.articleLink}>
            <span>Read the full article</span>
          </div>
        </a>
      </div>
    </>
  );
}
