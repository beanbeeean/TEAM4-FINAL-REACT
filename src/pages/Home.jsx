import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={`${styles.content_wrap}`}>
      <div className={`${styles.recommend_books}`}>
        <div>
          <span className={styles.title}>추천도서</span>
        </div>
        <img src="../imgs/default.png" />
      </div>

      <div className={styles.second_wrap}>
        <div className={`${styles.community} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>커뮤니티 최신 글</span>
            <span className={styles.more}>+ 더보기</span>
          </div>

          <div className={styles.community_item}>
            <li className={styles.board_title}>오늘 내가 있잖아~</li>
            <li className={styles.board_body}>
              아니 내가 오늘 급식을 먹으러갔는데 썸남이 어쩌구
            </li>
            <li className={styles.board_date}>2023.10.20</li>
          </div>
          <div className={styles.community_item}>
            <li className={styles.board_title}>오늘 내가 있잖아~</li>
            <li className={styles.board_body}>
              아니 내가 오늘 급식을 먹으러갔는데 썸남이 어쩌구
            </li>
            <li className={styles.board_date}>2023.10.20</li>
          </div>
          <div className={styles.community_item}>
            <li className={styles.board_title}>오늘 내가 있잖아~</li>
            <li className={styles.board_body}>
              아니 내가 오늘 급식을 먹으러갔는데 썸남이 어쩌구
            </li>
            <li className={styles.board_date}>2023.10.20</li>
          </div>
        </div>
        <div className={`${styles.reservation} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>열람실 예약 현황</span>
            <span className={styles.more}>+ 더보기</span>
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
    </div>
  );
};

export default Home;
