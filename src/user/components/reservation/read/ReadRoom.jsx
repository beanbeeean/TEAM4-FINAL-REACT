import React, { useEffect, useState } from "react";
import ReadRoomReservation from "./ReadRoomReservation";
import ReadRoomMap from "./ReadRoomMap";
import styles from "../../../css/reservation/ReadRoom.module.css";
import { useNavigate } from "react-router-dom/dist";

const ReadRoom = () => {
  const [readRoom, setReadRoom] = useState(1);
  const [seat, setSeat] = useState();

  const changeReadRoom = (num) => {
    setSeat();
    setReadRoom(num);
  };

  return (
    <div className={styles.readroom_wrap}>
      <div className={styles.readroom_tap}>
        <div
          onClick={() => changeReadRoom(1)}
          className={`${styles.readroom_tap_item} ${
            readRoom == 1 && styles.current_room
          }`}
        >
          1 열람실
        </div>
        <div
          onClick={() => changeReadRoom(2)}
          className={`${styles.readroom_tap_item} ${
            readRoom == 2 && styles.current_room
          }`}
        >
          2 열람실
        </div>
        <div
          onClick={() => changeReadRoom(3)}
          className={`${styles.readroom_tap_item} ${
            readRoom == 3 && styles.current_room
          }`}
        >
          3 열람실
        </div>
      </div>
      <div className={styles.readroom_content}>
        <ReadRoomMap setSeat={setSeat} seat={seat} />
        <ReadRoomReservation seat={seat} readRoom={readRoom} />
      </div>
    </div>
  );
};

export default ReadRoom;
