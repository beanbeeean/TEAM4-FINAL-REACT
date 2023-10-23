import React from "react";
import styles from "./css/Reservation.module.css";

const Reservation = () => {
  return (
    <div className={styles.graph}>
      <div className={styles.bar}>
        <div className={styles.barLabel}>1열람실</div>
        <div className={styles.barFill} style={{ width: "70%" }}>
          <span className={styles.barValue}>70%</span>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barLabel}>2열람실</div>
        <div className={styles.barFill} style={{ width: "50%" }}>
          <span className={styles.barValue}>50%</span>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barLabel}>3열람실</div>
        <div className={styles.barFill} style={{ width: "90%" }}>
          <span className={styles.barValue}>90%</span>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
