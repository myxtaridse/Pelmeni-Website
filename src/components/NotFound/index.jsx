import React from "react";
import styles from "./NotFound.module.scss";

import image from "../../assets/img/Z0H0mXcBY0Q.jpg";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <img width={200} src={image} alt="Not Found"></img>
    </div>
  );
}
export default NotFoundBlock;
