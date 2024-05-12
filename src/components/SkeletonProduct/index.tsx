import React from "react";
import style from "./SkeletonProduct.module.scss";

const index: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.block__img}></div>
      <div className={style.character}>
        <div className={style.character__title}></div>
        <div className={style.character__text}>
          <div className={style.character__text__stroke}></div>
          <div className={style.character__text__stroke}></div>
        </div>
        <div className={style.character__selector}></div>
        <div className={style.character__bottom}>
          <div className={style.character__button}></div>
          <div className={style.character__button}></div>
        </div>
      </div>
    </div>
  );
};

export default index;
