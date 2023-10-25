import React from "react";
import stylesAdmin from "../../css/reservation/ReservationManagement.module.css";
const StudyRoomReservationList = () => {
  return (
    <table className={stylesAdmin.reservation_studyroom_table}>
      <thead>
        <tr>
          <th>NO</th>
          <th>USER</th>
          <th>ROOM</th>
          <th>IN</th>
          <th>OUT</th>
          <th>RES_DATE</th>
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
