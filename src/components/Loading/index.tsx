import React from "react";
import styles from "./Loading.module.scss";

const index: React.FC = () => {
  return (
    <div className="loaderBlock">
      <span className={styles.loader}></span>
    </div>
  );
};

export default index;
