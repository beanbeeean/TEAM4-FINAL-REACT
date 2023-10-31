import React, { useState } from "react";
import styles from "../../../css/reservation/ReadRoom.module.css";
const ReadRoomSeat = ({readRoom, setSeat, seat, test}) => {

  const [currentTime, setCurrentTime] = useState(new Date().toISOString().replace('T', ' ').slice(0, 19));

  const selection = (e) => {
    console.log(e.target.textContent);
    if(e.target.textContent == seat)
      setSeat();
    else
      setSeat(e.target.textContent);
  };

  return (
    <>
      { (test[readRoom].re_state && currentTime>test[readRoom].re_reservation) ? (<td
            className={`${seat == test[readRoom].re_seat && styles.user_select}`}
            onClick={(e) => selection(e)}
          >
            {test[readRoom].re_seat}
          </td>)
          : 
          (<td className={styles.impossible_select}> 
            X
          </td>)
      }
    </>
  );
};

export default ReadRoomSeat;
