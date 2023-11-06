import React from "react";
import styles from "../../css/mypage/MypageReservation.module.css";

const StudyReserveItem = ({study}) => {

  console.log(study);

  let test= parseInt(study.sr_reg_date.substring(11, 13));
  test+=2;
  test=test.toString().padStart(2,'0');

  
  return (
    <div className={styles.common}>
      <div className={`${styles.reserve_date} ${styles.items}`}>{study.sr_reg_date.substring(0, 10)}</div>
      <div className={`${styles.pin} ${styles.items}`}>
        <div className={styles.pin_body}></div>
        <div className={styles.pin_head}></div>
      </div> 
      <div className={`${styles.detail_content} ${styles.items}`}>
        <span className={styles.reserve_time}>{study.sr_time}:00~{study.sr_time+1}:00</span>
        <span className={styles.room_num}>{study.sr_room}열람실 </span>
        <span className={styles.seat_num}>{study.sr_room}번</span>
      </div>
    </div>
  );
};

export default StudyReserveItem;
