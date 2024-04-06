import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

import image from "../../assets/img/Z0H0mXcBY0Q.jpg";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <img width={200} src={image} alt="Not Found"></img>
      <Link to="/">
        <button>Перезагрузить страницу</button>
      </Link>
    </div>
  );
}
export default NotFoundBlock;
