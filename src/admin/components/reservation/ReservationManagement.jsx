import React, { useState } from "react";
import stylesAdmin from "../../css/reservation/ReservationManagement.module.css";
import ReadRoomSetting from "./ReadRoomSetting";
import ReadRoomReservationList from "./ReadRoomReservationList";
import StudyRoomReservationList from "./StudyRoomReservationList";
import StudyRoomSetting from "./StudyRoomSetting";

const ReservationManagement = () => {
  const [tapActive, setTapActive] = useState(true);
  const [smallTap, setSmallTap] = useState(true);

  const tapChangeHandler = (num) => {
    if (num == 1) {
      setTapActive(true);
      setSmallTap(true);
    } else if (num == 2) {
      setTapActive(false);
      setSmallTap(true);
    }
  };
  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>RESERVATION MANAGEMENT</h2>
      <ul className={stylesAdmin.rm_tap}>
        <li
          onClick={() => tapChangeHandler(1)}
          className={`${tapActive && stylesAdmin.rm_tap_on}`}
        >
          예약 내역
        </li>
        <li
          onClick={() => tapChangeHandler(2)}
          className={`${!tapActive && stylesAdmin.rm_tap_on}`}
        >
          설정
        </li>
      </ul>
      <ul className={stylesAdmin.rm_first_tap}>
        <li
          onClick={() => setSmallTap(true)}
          className={`${smallTap && stylesAdmin.rm_tap_on}`}
        >
          · 열람실
        </li>
        <li
          onClick={() => setSmallTap(false)}
          className={`${!smallTap && stylesAdmin.rm_tap_on}`}
        >
          · 스터디룸
        </li>
      </ul>
      {/* 컴포넌트 나눠서 생성해야함 */}
      <div className={stylesAdmin.rm_content}>
        {tapActive ? (
          smallTap ? (
            <ReadRoomReservationList />
          ) : (
            <StudyRoomReservationList />
          )
        ) : smallTap ? (
          <ReadRoomSetting />
        ) : (
          <StudyRoomSetting />
        )}
      </div>
    </div>
  );
};

export default ReservationManagement;
