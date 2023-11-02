import React, { useEffect, useState } from "react";
import styles from "../../css/mypage/Mypage.module.css";
import MypageProfile from "../../components/mypage/MypageProfile";
import MypageReservation from "../../components/mypage/MypageReservation";
import MypageBook from "../../components/mypage/MypageBook";
import MypageCommunity from "../../components/mypage/MypageCommunity";
import MypageChat from "../../components/mypage/MypageChat";
import { useLocation } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";
import { bookActions } from "../../../redux/book/slices/bookSlice";

const MyPage = () => {
  const [on, setOn] = useState(1);
  const dispatch = useDispatch();

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
      .get(`/checkout_books/checkout_book_list`, {
        params: {
          id: null,
          u_email: null,
        },
      })
      .then((response) => {
        const chkBookDtos = response.data;
        dispatch(chkBookActions.fetchChkBookDto(chkBookDtos.dtos));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className={styles.mypage_wrap}>
      <h4>MY PAGE</h4>
      <div className={styles.search_area}>
        <div className={styles.category_box}>
          <ul>
            <li
              className={`${styles.board_category} ${on == 1 && styles.on}`}
              onClick={() => setOn(1)}
            >
              PROFILE
            </li>
            <li
              className={`${styles.board_category} ${on == 2 && styles.on}`}
              onClick={() => setOn(2)}
            >
              RESERVATION
            </li>
            <li
              className={`${styles.board_category} ${on == 3 && styles.on}`}
              onClick={() => setOn(3)}
            >
              CHECK-OUT BOOKS
            </li>
            <li
              className={`${styles.board_category} ${on == 4 && styles.on}`}
              onClick={() => setOn(4)}
            >
              CONTENTS
            </li>
            <li
              className={`${styles.board_category} ${on == 5 && styles.on}`}
              onClick={() => setOn(5)}
            >
              MY CHAT
            </li>
          </ul>
        </div>
      </div>
      {on == 1 && <MypageProfile />}
      {on == 2 && <MypageReservation />}
      {on == 3 && <MypageBook />}
      {on == 4 && <MypageCommunity />}
      {on == 5 && <MypageChat />}
    </div>
  );
};

export default MyPage;
