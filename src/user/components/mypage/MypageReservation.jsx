import React, { useState } from "react";
import styles from "../../css/mypage/MypageReservation.module.css";
import { GrLocationPin } from "react-icons/gr";
import MypageReserveItem from "./MypageReserveItem";

const MypageReservation = () => {
  const [readRoom, setReadRoom] = useState(1);
  const [seat, setSeat] = useState();

  const changeMenu = (num) => {
    setSeat();
    setReadRoom(num);
  };

  return (
    <div className={styles.reserve_wrap}>
      <div className={styles.reserve_tap}>
        <div className={styles.reserve_tap_item}>좌석발권</div>
        <div className={styles.reserve_tap_item}>스터디룸</div>
      </div>

      <div className={styles.reserve_seat_content}>
        <MypageReserveItem />
        <MypageReserveItem />
      </div>

      <div className={styles.reserve_studyroom_content}>
        <MypageReserveItem />
      </div>
    </div>
  );
};

export default MypageReservation;
