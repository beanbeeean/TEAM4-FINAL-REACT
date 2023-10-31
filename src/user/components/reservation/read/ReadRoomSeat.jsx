import React, { useState } from "react";
import styles from "../../../css/reservation/ReadRoom.module.css";
const ReadRoomSeat = ({readRoom, setSeat, seat, test}) => {

  let today = new Date(); 
  let today2 = new Date(test[readRoom].re_reservation); 

  const selection = (e) => {
    console.log(e.target.textContent);
    if(e.target.textContent == seat)
      setSeat();
    else
      setSeat(e.target.textContent);
  };

  return (
    <>
      { (test[readRoom].re_state && today.getTime() > today2.getTime()) ? (<td
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
