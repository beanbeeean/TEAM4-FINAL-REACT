import React, { useState } from "react";
import styles from "../../css/common/mypage/Mypage.module.css";
import CheckoutListItem from "../../components/book/CheckoutListItem";
import MyChat from "../../components/common/chat/MyChat";
import MypageProfile from "../../components/mypage/MypageProfile";
import MypageReservation from "../../components/mypage/MypageReservation";
import MypageBook from "../../components/mypage/MypageBook";
import MypageCommunity from "../../components/mypage/MypageCommunity";
import MypageChat from "../../components/mypage/MypageChat";

const MyPage = () => {
  const [on, setOn] = useState(1);

  let contentComponent;

  switch (on) {
    case 1:
      contentComponent = <MypageProfile />;
      break;
    case 2:
      contentComponent = <MypageReservation />;
      break;
    case 3:
      contentComponent = <MypageBook />;
      break;
    case 4:
      contentComponent = <MypageCommunity />;
      break;
    case 5:
      contentComponent = <MypageChat />;
      break;
  }

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
      {/* <MypageReservation /> */}
      {/* <MypageBook /> */}
      {/* <MypageCommunity /> */}
      {/* <MypageChat /> */}
      {contentComponent}
    </div>
  );
};

export default MyPage;
