import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "../../css/common/Home.module.css";
import RecommendItem from "../../components/common/HomeRecommendItem";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/common/Recommend.css";
import "swiper/css/navigation";

const Home = () => {
  // 연결된거 확인
  const [data, setData] = useState([]);

  return (
    <div className={`${styles.content_wrap}`}>
      <div className={styles.first_wrap}>
        <div className={`${styles.recommend_books}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>추천도서</span>
          </div>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            centeredSlides={true}
            speed={1500}
            loop={true}
            loopAdditionalSlides={1}
            navigation
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            //   pagination={{
            //     clickable: true,
            //   }}
          >
            <SwiperSlide className="swiper_slide">
              <RecommendItem />
              <RecommendItem />
              <RecommendItem />
              <RecommendItem />
              <RecommendItem />
            </SwiperSlide>
            <SwiperSlide className="swiper_slide">
              <RecommendItem />
              <RecommendItem />
              <RecommendItem />
              <RecommendItem />
              <RecommendItem />
            </SwiperSlide>
          </Swiper>
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
          <div className={styles.table_wrap}>
            <table className={styles.board_table}>
              <thead>
                <tr>
                  <th className="text-center">구분</th>
                  <th className="text-center">제목</th>
                  <th className="text-center">작성자</th>
                  <th className="text-center">작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${styles.reservation} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>열람실 예약 현황</span>
            <Link to="/reservation">
              <span className={styles.more}>+ more</span>
            </Link>
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
