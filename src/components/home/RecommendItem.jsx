import React from "react";
import styles from "./css/RecommendItem.module.css";
import { Link } from "react-router-dom";

const RecommendItem = () => {
  return (
    <Link to="./books/:id">
      <div className={styles.slide_block}>
        <img src="../imgs/default.png" /> <br />
        <div className={styles.text_wrap}>
          <span className={styles.title}>그대들은 어떻게 살 것인가.</span>{" "}
          <br />
          <span className={styles.author}>미야자키 하야오 저&nbsp;|</span>
          <span className={styles.publisher}>&nbsp;지브리</span>
        </div>
      </div>
    </Link>
  );
};

export default RecommendItem;
