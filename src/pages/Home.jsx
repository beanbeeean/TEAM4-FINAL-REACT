import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Home.module.css";
import Community from "../components/home/Community";
import { Link } from "react-router-dom";
import BookItem from "../components/home/BookItem";
import Recommend from "../components/home/Recommend";
import Profile from "../components/home/Profile";
import Reservation from "../components/home/Reservation";

const Home = () => {
  // 연결된거 확인
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/showMe")
      .then((res) => {
        return res.json();
      })
      .then(function (result) {
        setData(result);
      });
  }, []);

  return (
    <div className={`${styles.content_wrap}`}>
      <div className={styles.first_wrap}>
        <div className={`${styles.recommend_books}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>추천도서</span>
          </div>
          <Recommend />
        </div>

        {/* <div className={`${styles.my_info_wrap} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>내 정보</span>
          </div>
          <Profile />
        </div> */}
      </div>

      <div className={styles.second_wrap}>
        <div className={`${styles.community} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>커뮤니티 최신 글</span>
            <Link to="/board">
              <span className={styles.more}>+ more</span>
            </Link>
          </div>
          <Community />
        </div>

        <div className={`${styles.reservation} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>열람실 예약 현황</span>
            <Link to="/readroom">
              <span className={styles.more}>+ more</span>
            </Link>
          </div>
          <Reservation />
        </div>
      </div>
    </div>
  );
};

export default Home;
