import React from "react";
import stylesAdmin from "../../css/reservation/ReservationManagement.module.css";

const ReadRoomReservationList = () => {
  return (
    <table className={stylesAdmin.reservation_seat_table}>
      <thead>
        <tr>
          <th>번호</th>
          <th>이메일</th>
          <th>열람실</th>
          <th>좌석</th>
          <th>입실 시간</th>
          <th>퇴실 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr className={stylesAdmin.reservation_list}>
          <td>1</td>
          <td>beanbeeean</td>
          <td>3F</td>
          <td>44</td>
          <td>2023.10.25 17:14</td>
          <td>2023.10.25 19:14</td>
        </tr>
        <tr className={stylesAdmin.reservation_list}>
          <td>1</td>
          <td>beanbeeean</td>
          <td>3F</td>
          <td>44</td>
          <td>2023.10.25 17:14</td>
          <td>2023.10.25 19:14</td>
        </tr>
        <tr className={stylesAdmin.reservation_list}>
          <td>1</td>
          <td>beanbeeean</td>
          <td>3F</td>
          <td>44</td>
          <td>2023.10.25 17:14</td>
          <td>2023.10.25 19:14</td>
        </tr>
        <tr className={stylesAdmin.reservation_list}>
          <td>1</td>
          <td>beanbeeean</td>
          <td>3F</td>
          <td>44</td>
          <td>2023.10.25 17:14</td>
          <td>2023.10.25 19:14</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ReadRoomReservationList;
