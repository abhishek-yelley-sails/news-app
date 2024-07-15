import cssStyles from "./NewsCard.module.css";
/*
{
  "source": {
    "id": "usa-today",
    "name": "USA Today"
  },
  "author": "Ahjané Forbes",
  "title": "Stop & Shop will be closing 32 'underperforming' stores in 5 New England states - USA TODAY",
  "description": "Stop & Shop announced Friday that it will be closing the doors on 32 of its underperforming grocery stores across five New England states.",
  "url": "https://www.usatoday.com/story/money/food/2024/07/12/stop-shop-closing-32-stores/74387852007/",
  "urlToImage": "https://www.usatoday.com/gcdn/authoring/authoring-images/2024/07/12/USAT/74388207007-usatsi-23727565.jpg?crop=1999,1125,x0,y0&width=1999&height=1125&format=pjpg&auto=webp",
  "publishedAt": "2024-07-14T08:34:45Z",
  "content": "Stop &amp; Shop announced that it will be closing the doors on 32 of its underperforming grocery stores across five New England states by the end of the year.  \r\nThe community grocery chain, which is… [+4295 chars]"
}
*/

export default function NewsCard() {
  return (
    <div className={cssStyles.newsCard}>
      <div className={cssStyles.newsCardImageContainer}>
        <img
          src="https://www.usatoday.com/gcdn/authoring/authoring-images/2024/07/12/USAT/74388207007-usatsi-23727565.jpg?crop=1999,1125,x0,y0&width=1999&height=1125&format=pjpg&auto=webp"
          alt="Article Image"
          className={cssStyles.newsCardImage}
        />
      </div>
      <div className={cssStyles.newsCardInfo}>
        <h2>
          Stop & Shop will be closing 32 'underperforming' stores in 5 New England states - USA TODAY
        </h2>
        <p><strong>Author: Ahjané Forbes</strong></p>
        <p>Stop &amp; Shop announced that it will be closing the doors on 32 of its underperforming grocery stores across five New England states by the end of the year.  \r\nThe community grocery chain, which is… </p>
        <a href="https://www.usatoday.com/story/money/food/2024/07/12/stop-shop-closing-32-stores/74387852007/">Read the full article</a>
      </div>
    </div>
  )
}