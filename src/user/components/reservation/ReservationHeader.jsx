import React from "react";
import styles from "../../css/reservation/ReservationHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../redux/common/slices/commonSlice";
const ReservationHeader = () => {
  const dispatch = useDispatch();
  const { reservationMenu } = useSelector((state) => state.common);

  return (
    <div className={styles.reservation_header}>
      <h3 className={styles.reservation_title}>Reservation</h3>
      <div className={styles.reservation_area}>
        <div className={styles.category_box}>
          <ul>
            <li
              className={`${styles.reservation_category} ${
                reservationMenu == 1 && styles.on
              }`}
              onClick={() => dispatch(commonActions.setReservationMenu(1))}
            >
              열람실
            </li>
            <li
              className={`${styles.reservation_category} ${
                reservationMenu == 2 && styles.on
              }`}
              onClick={() => dispatch(commonActions.setReservationMenu(2))}
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
