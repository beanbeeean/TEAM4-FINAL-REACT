import React from "react";
import styles from "../../css/common/SearchMain.module.css";
import { Link } from "react-router-dom";
import SearchCommunity from "../../components/common/SearchCommunity";

const SearchMain = () => {
  return (
    <div>
      <div className={`${styles.community} ${styles.block}`}>
        <div className={styles.mini_nav}>
          <span className={styles.title}>도서 추천 게시판</span>
          <Link to="/board">
            <span className={styles.more}>+ more</span>
          </Link>
        </div>
        <SearchCommunity />
      </div>
    </div>
  );
};

export default SearchMain;
