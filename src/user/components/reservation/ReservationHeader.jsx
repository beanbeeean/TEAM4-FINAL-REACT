import React from "react";
import styles from "../../css/reservation/ReservationHeader.module.css";
const ReservationHeader = ({ category, setCategory }) => {
  return (
    <div className={styles.reservation_header}>
      <h3 className={styles.reservation_title}>Reservation</h3>
      <div className={styles.reservation_area}>
        <div className={styles.category_box}>
          <ul>
            <li
              className={`${styles.reservation_category} ${
                category == 1 && styles.on
              }`}
              onClick={() => setCategory(1)}
            >
              열람실
            </li>
            <li
              className={`${styles.reservation_category} ${
                category == 2 && styles.on
              }`}
              onClick={() => setCategory(2)}
            >
              스터디룸
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReservationHeader;
