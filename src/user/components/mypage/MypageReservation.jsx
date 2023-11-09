import React, { useEffect, useState } from "react";
import styles from "../../css/mypage/MypageReservation.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { myPageRead, myPageStudy } from "../common/login/APIUtils";
import ReadReserveItem from "./ReadReserveItem";
import StudyReserveItem from "./StudyReserveItem";

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
  const [seat, setSeat] = useState(null);
  const [study, setStudy] = useState(null);

  if (seat == null) {
    myPageRead({ startDate, endDate })
      .then((response) => {
        console.log(response.data);
        console.log("resresres :: ", response.data);
        if (response.data.length > 0) {
          setSeat(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  if (study == null) {
    myPageStudy({ startDate, endDate })
      .then((response) => {
        console.log("myPageStudy : ", response.data);
        if (response.data.length > 0) {
          // setSeat(response.data);
          setStudy(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  useEffect(() => {
    myPageRead({ startDate, endDate })
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          setSeat(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [startDate, endDate]);

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

      <div className={styles.reserve_list}>
        <div className={styles.reserve_seat_content}>
          {seat ? (
            seat.map((item, index) => <ReadReserveItem seat={item} />)
          ) : (
            <div className={styles.no_result}>예약 내역이 없습니다.</div>
          )}
        </div>

        <div className={styles.reserve_studyroom_content}>
          {study ? (
            study.map((item, index) => <StudyReserveItem study={item} />)
          ) : (
            <div className={styles.no_result}>예약 내역이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MypageReservation;
