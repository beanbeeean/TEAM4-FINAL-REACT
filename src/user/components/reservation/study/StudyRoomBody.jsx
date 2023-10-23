import React, { useState } from "react";
import styles from "../../../css/reservation/StudyRoom.module.css";

const getBusinessHours = (start, end) => {
  const hours = [];
  for (let i = start; i <= end; i++) {
    hours.push(i);
  }
  return hours;
};

const StudyRoomBody = () => {
  const [times, setTimes] = useState(getBusinessHours(8, 22));

  return (
    <div className={styles.study_reservation_wrap}>
      <div className={styles.study_reservation_date}>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>SPACE1 - A</th>
              <th>SPACE1 - A</th>
            </tr>
          </thead>
          <tbody>
            {times.map((t) => (
              <tr>
                <td>{t}:00</td>
                <td>예약 가능</td>
                <td>예약 가능</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.study_reservation_confirm}></div>
    </div>
  );
};

export default StudyRoomBody;
