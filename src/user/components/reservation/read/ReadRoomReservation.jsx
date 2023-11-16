import React, { useState } from "react";
import styles from "../../../css/reservation/ReadRoom.module.css";
import ReservationModal from "./ReservationModal";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useSelector } from "react-redux";
import LoginModal from "../../common/LoginModal";

const ReadRoomReservation = ({ seat, readRoom, setTest }) => {
  const [modalShow, setModalShow] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useSelector((state) => state.user.flag);
  const [loginModalShow, setLoginModalShow] = useState(false);


  const checkReservation = () => {
    if (seat == null) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "자리를 선택해주세요.",
        iconColor: "yellow",
        showConfirmButton: true,
        timer: 3000,
      });
    } else if(!user) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "로그인이 필요합니다.",
        iconColor: "rgb(33, 41, 66)",
        showConfirmButton: true,
        timer: 3000, // 메시지를 표시한 후 3초 동안 대기
      }).then((result) => {
        setLoginModalShow(true)
      });
    }
    else {
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
        setTest={setTest}
        onHide={() => setModalShow(false)}
      />
      <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
    </div>
  );
};

export default ReadRoomReservation;
