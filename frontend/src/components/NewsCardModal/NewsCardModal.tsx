import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { NewsCardProps, NewsCardModalHandle } from "../../util/definitions";
import cssStyles from "./NewsCardModal.module.css";

const NewsCardModal = forwardRef<NewsCardModalHandle, NewsCardProps>(
  function NewsCardModal(
    { sourceId, sourceName, author, title, description, url, image, date },
    ref
  ) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    useImperativeHandle(ref, () => ({
      open() {
        dialogRef.current?.showModal();
      },
    }));
    return createPortal(
      <dialog ref={dialogRef} className={cssStyles.newsCardModal}>
        <form method="dialog" className={cssStyles.form}>
          <button className={cssStyles.button}>X</button>
        </form>
        <div className={cssStyles.container}>
          <h1>{title}</h1>
          <img src={image} alt={title + " article image"} />
          <p title={sourceId}>
            <strong>{sourceName}</strong>
          </p>
          <p>
            <strong>Author: {author}</strong>
          </p>
          <p>{date}</p>
          <p>{description}</p>
          <a href={url} onClick={(e) => e.stopPropagation()}>
            Read the full article
          </a>
        </div>
      </dialog>,
      document.getElementById("news-card-modal")!
    );
  }
);

export default NewsCardModal;
