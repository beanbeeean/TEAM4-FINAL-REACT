import React, { useState } from "react";
import styles from "../../../css/reservation/ReadRoom.module.css";
import ReservationModal from "./ReservationModal";

const ReadRoomReservation = ({ seat, readRoom }) => {
  const [modalShow, setModalShow] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const checkReservation = () => {
    if (seat == 0) {
      alert("자리를 선택해주세요.");
    } else {
      setModalShow(true);
    }
  };

  return (
    <div className={styles.readroom_reservation}>
      <div className={styles.map_info}>
        <div className={styles.seat_info}>
          <div className={styles.seat_ex}></div>
          <div className={styles.seat_txt}>선택 가능한 좌석</div>
        </div>
        <div className={styles.door_info}>
          <div className={styles.di_wrap}>
            <div className={styles.di_left}></div>
            <div className={styles.di_right}></div>
          </div>
          <div className={styles.di_txt}>입구</div>
        </div>
      </div>
      <div className={styles.reservation_area}>
        <div className={styles.selected_area}>
          <div>
            선택
            <br />
            좌석
          </div>
          <div className={styles.selected_num}>{seat}</div>
        </div>
        <div
          onClick={() => checkReservation()}
          className={styles.reservation_btn}
        >
          예약하기
        </div>
      </div>
      <ReservationModal
        show={modalShow}
        readRoom={readRoom}
        seat={seat}
        time={currentTime}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default ReadRoomReservation;
