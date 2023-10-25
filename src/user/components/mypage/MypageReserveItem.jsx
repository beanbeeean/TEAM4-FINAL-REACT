import React from "react";
import styles from "../../css/mypage/MypageReservation.module.css";

const MypageReserveItem = () => {
  return (
    <div className={styles.common}>
      <div className={`${styles.reserve_date} ${styles.items}`}>2023.10.24</div>
      <div className={`${styles.pin} ${styles.items}`}>
        <div className={styles.pin_body}></div>
        <div className={styles.pin_head}></div>
      </div>
      <div className={`${styles.detail_content} ${styles.items}`}>
        <span className={styles.reserve_time}>19:00~22:00</span>
        <span className={styles.room_num}>1열람실</span>
        <span className={styles.seat_num}>34번</span>
      </div>
    </div>
  );
};

export default MypageReserveItem;
