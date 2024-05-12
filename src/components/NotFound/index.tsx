import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

import image from "../../assets/img/Z0H0mXcBY0Q.jpg";

const NotFoundBlock: React.FC = () => {
  const navigate = useNavigate();
  function reloadPage() {
    navigate("/");
  }
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено </h1>
      <img width={210} src={image} alt="Not Found" />

      <button onClick={reloadPage}>Перезагрузить страницу</button>
    </div>
  );
};
export default NotFoundBlock;
