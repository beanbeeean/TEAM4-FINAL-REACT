import React, { useState } from "react";
import styles from "../../css/common/Mypage.module.css";
import MypageProfile from "../../components/common/MypageProfile";
import CheckoutListItem from "../../components/book/CheckoutListItem";
import MypageBook from "../../components/common/MypageBook";
import MypageCommunity from "../../components/common/MypageCommunity";
import MypageReservation from "../../components/common/MypageReservation";

const MyPage = () => {
  const [on, setOn] = useState(1);

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

      {/* <MypageProfile /> */}
      {/* <MypageBook /> */}
      {/* <MypageCommunity /> */}
      <MypageReservation />
    </div>
  );
};

export default MyPage;
