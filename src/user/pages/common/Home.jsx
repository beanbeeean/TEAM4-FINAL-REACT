import React, { useEffect, useState } from "react";
import styles from "../../css/common/Home.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/common/Recommend.css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { bookActions } from "../../../redux/book/slices/bookSlice";
import HomeRecommendItem from "../../components/common/HomeRecommendItem";
import HomeCommunityItem from "../../components/common/HomeCommunityItem";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { readroomActions } from "../../../redux/readroom/slices/readroomSlice";

const Home = () => {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const { bookDto } = useSelector((state) => state.book);
  const { roomDto } = useSelector((state) => state.readroom);

  const [communities, setCommunities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [firRooms, setFirRooms] = useState([]);
  const [sndRooms, setSndRooms] = useState([]);
  const [thdRooms, setThdRooms] = useState([]);

  useEffect(() => {
    axios
      .get(`/checkout_books/home`, {
        params: {
          category: null,
          keyword: null,
        },
      })
      .then((response) => {
        const bookDtos = response.data;
        dispatch(bookActions.fetchBookDto(bookDtos));
      })
      .catch((error) => console.log(error));

    axios
      .get(`/community`)
      .then((response) => {
        setCommunities(response.data.communityDtos);
        const communityDtos = response.data;
        dispatch(communityActions.fetchCommunityDto(communityDtos));
      })
      .catch((error) => console.log(error));

    axios
      .get(`/read/seat`)
      .then((response) => {
        const roomDtos = response.data;
        console.log("roomDtos :: ", roomDtos);
        dispatch(readroomActions.fetchRoomDto(roomDtos));
        setRooms(roomDtos);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setBooks(bookDto.filter((e) => e.b_category === 3));
  }, [bookDto]);

  useEffect(() => {
    setFirRooms(roomDto.filter((e) => e.re_room_no === 1 && e.re_state == 1));
    setSndRooms(roomDto.filter((e) => e.re_room_no === 2 && e.re_state == 1));
    setThdRooms(roomDto.filter((e) => e.re_room_no === 3 && e.re_state == 1));
  }, [roomDto]);

  console.log("firRooms :: ", firRooms.length);
  console.log("sndRooms :: ", sndRooms);
  console.log("thdRooms :: ", thdRooms);

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
          >
            <SwiperSlide className="swiper_slide">
              {books.map(
                (book, idx) => idx < 5 && <HomeRecommendItem book={book} />
              )}
            </SwiperSlide>
            <SwiperSlide className="swiper_slide">
              {books.map(
                (book, idx) =>
                  idx > 4 && idx < 10 && <HomeRecommendItem book={book} />
              )}
            </SwiperSlide>
          </Swiper>
        </div>
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
                {communities.map(
                  (community, idx) =>
                    idx < 5 && <HomeCommunityItem community={community} />
                )}
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
              <div
                className={styles.barFill}
                style={{ width: `${(firRooms.length / 44) * 100}%` }}
              >
                <span className={styles.barValue}>{firRooms.length}/44</span>
              </div>
            </div>
            <div className={styles.bar}>
              <div className={styles.barLabel}>2열람실</div>
              <div
                className={styles.barFill}
                style={{ width: `${(sndRooms.length / 44) * 100}%` }}
              >
                <span className={styles.barValue}>{sndRooms.length}/44</span>
              </div>
            </div>
            <div className={styles.bar}>
              <div className={styles.barLabel}>3열람실</div>
              <div
                className={styles.barFill}
                style={{ width: `${(thdRooms.length / 44) * 100}%` }}
              >
                <span className={styles.barValue}>{thdRooms.length}/44</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
