import React from "react";
import stylesAdmin from "../../css/reservation/ReservationManagement.module.css";
const StudyRoomReservationList = () => {
  return (
    <table className={stylesAdmin.reservation_studyroom_table}>
      <thead>
        <tr>
          <th>번호</th>
          <th>이메일</th>
          <th>스터디룸</th>
          <th>입실 시간</th>
          <th>퇴실 시간</th>
          <th>예약 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr className={stylesAdmin.reservation_list}>
          <td>1</td>
          <td>Beanbeeean</td>
          <td>SPACE1-A</td>
          <td>2023.10.25 22:00</td>
          <td>2023.10.25 24:00</td>
          <td>2023.10.25 20:00</td>
        </tr>
        <tr className={stylesAdmin.reservation_list}>
          <td>1</td>
          <td>Beanbeeean</td>
          <td>SPACE1-A</td>
          <td>2023.10.25 22:00</td>
          <td>2023.10.25 24:00</td>
          <td>2023.10.25 20:00</td>
        </tr>
        <tr className={stylesAdmin.reservation_list}>
          <td>1</td>
          <td>Beanbeeean</td>
          <td>SPACE1-A</td>
          <td>2023.10.25 22:00</td>
          <td>2023.10.25 24:00</td>
          <td>2023.10.25 20:00</td>
        </tr>
        <tr className={stylesAdmin.reservation_list}>
          <td>1</td>
          <td>Beanbeeean</td>
          <td>SPACE1-A</td>
          <td>2023.10.25 22:00</td>
          <td>2023.10.25 24:00</td>
          <td>2023.10.25 20:00</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StudyRoomReservationList;
