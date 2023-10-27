import React, { useState } from "react";
import styles from "../../css/mypage/MypageReservation.module.css";
import MypageReserveItem from "./MypageReserveItem";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MypageReservation = () => {
  const currentDate = new Date();
  const startOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const [startDate, setStartDate] = useState(startOfCurrentMonth);
  const [endDate, setEndDate] = useState(endOfCurrentMonth);

  return (
    <div className={styles.reserve_wrap}>
      <div className={styles.datePicker_wrap}>
        <span>기간 설정 :&nbsp;</span>
        <ReactDatePicker
          className={styles.datePicker}
          selected={startDate}
          dateFormat="yyyy/MM/dd"
          onChange={(date) => setStartDate(date)}
        />
        &nbsp;~&nbsp;
        <ReactDatePicker
          className={styles.datePicker}
          selected={endDate}
          dateFormat="yyyy/MM/dd"
          onChange={(date) => setEndDate(date)}
        />
      </div>

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
