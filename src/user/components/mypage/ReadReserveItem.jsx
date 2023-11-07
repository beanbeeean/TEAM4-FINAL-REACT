import React from "react";
import styles from "../../css/mypage/MypageReservation.module.css";

const ReadReserveItem = ({seat}) => {

  console.log(seat);

  let test= parseInt(seat.l_reg_date.substring(11, 13));
  test+=2;
  test=test.toString().padStart(2,'0');

  
  return (
    <div className={styles.common}>
      <div className={`${styles.reserve_date} ${styles.items}`}>{seat.l_reg_date.substring(0, 10)}</div>
      <div className={`${styles.pin} ${styles.items}`}>
        <div className={styles.pin_body}></div>
        <div className={styles.pin_head}></div>
      </div>
      <div className={`${styles.detail_content} ${styles.items}`}>
        <span className={styles.reserve_time}>{seat.l_reg_date.substring(11, 16)}~{test}:{seat.l_reg_date.substring(14, 16)}</span>
        <span className={styles.room_num}>{seat.l_room_no}열람실 </span>
        <span className={styles.seat_num}>{seat.l_seat}번</span>
      </div>
    </div>
  );
};

export default ReadReserveItem;
