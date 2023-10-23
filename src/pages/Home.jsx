import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Home.module.css";
import Community from "../components/home/Community";
import { Link } from "react-router-dom";
import BookItem from "../components/home/BookItem";
import Recommend from "../components/home/Recommend";

const Home = () => {
  return (
    <div className={`${styles.content_wrap}`}>
      <div className={`${styles.recommend_books}`}>
        <div>
          <span className={styles.title}>추천도서</span>
        </div>
        <Recommend />

      </div>

      <div className={styles.second_wrap}>
        <div className={`${styles.community} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>커뮤니티 최신 글</span>
            <Link to="/board"><span className={styles.more}>+ more</span></Link>
          </div>

          <Community />

        </div>
        <div className={`${styles.reservation} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>열람실 예약 현황</span>
            <Link to="/readroom"><span className={styles.more}>+ more</span></Link>
          </div>

          <div className={styles.graph}>
            <div className={styles.bar}>
              <div className={styles.barLabel}>1열람실</div>
              <div className={styles.barFill} style={{ width: "70%" }}>
                <span className={styles.barValue}>70%</span>
              </div>
            </div>
            <div className={styles.bar}>
              <div className={styles.barLabel}>2열람실</div>
              <div className={styles.barFill} style={{ width: "50%" }}>
                <span className={styles.barValue}>50%</span>
              </div>
            </div>
            <div className={styles.bar}>
              <div className={styles.barLabel}>3열람실</div>
              <div className={styles.barFill} style={{ width: "90%" }}>
                <span className={styles.barValue}>90%</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className={styles.books_wrap}>
        <div className={styles.mini_nav}>
          <span className={styles.title}>베스트셀러</span>
          {/* <Link to="/books"><span className={styles.more}>+ 더보기</span></Link> */}
        </div>

        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
        <Link to="/books"><span className={styles.more_book}>+ more</span></Link>
      </div>

    </div>
  );
};

export default Home;
