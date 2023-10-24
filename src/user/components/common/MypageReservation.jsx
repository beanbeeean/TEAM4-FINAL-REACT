import React, { useState } from "react";
import styles from "../../css/common/MypageReservation.module.css";
import { GrLocationPin } from "react-icons/gr";

const MypageReservation = () => {
  const [readRoom, setReadRoom] = useState(1);
  const [seat, setSeat] = useState();

  const changeMenu = (num) => {
    setSeat();
    setReadRoom(num);
  };

  return (
    <div className={styles.reserve_wrap}>
      <div className={styles.reserve_tap}></div>
      <div className={styles.reserve_content}>
        <div
          onClick={() => changeMenu(1)}
          className={`${styles.reserve_tap_item} ${
            readRoom == 1 && styles.current_room
          }`}
        >
          좌석발권
        </div>
        <div>
          <div>2023.10.24</div>
          <div className={styles.pin}>
            <div className={styles.pin_body}></div>
            <div className={styles.pin_head}></div>
          </div>
        </div>
      </div>

      <div className={styles.reserve_content}>
        <div
          onClick={() => changeMenu(2)}
          className={`${styles.reserve_tap_item} ${
            readRoom == 2 && styles.current_room
          }`}
        >
          스터디룸
        </div>
        <div>
          <div>2023.10.24</div>
          <div className={styles.pin}>
            <div className={styles.pin_body}></div>
            <div className={styles.pin_head}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageReservation;
