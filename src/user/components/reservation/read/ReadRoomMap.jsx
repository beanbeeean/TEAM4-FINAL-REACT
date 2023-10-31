import React, { useState } from "react";
import styles from "../../../css/reservation/ReadRoom.module.css";
import ReadRoomSeat from "./ReadRoomSeat";
const ReadRoomMap = ({readRoom, setSeat, seat, test}) => {
  return (
    <div className={styles.readroom_map}>
      <div className={styles.rm_first_line}>
        <table className={styles.eight}>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+0} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+1} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+2} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+3} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+4} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+5} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+6} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+7} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
        </table>
        <table className={styles.ten}>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+8} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+9} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+10} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+11} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+12} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+13} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+14} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+15} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+16} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+17} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
        </table>
        <table className={styles.ten}>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+18} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+19} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+20} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+21} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+22} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+23} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
        </table>
      </div>
      <div className={styles.rm_second_line}>
        <table className={styles.six}>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+24} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+25} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+26} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+27} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+28} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+29} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
        </table>
        <div className={styles.door_wrap}>
          <div className={styles.left_door}></div>
          <div className={styles.right_door}></div>
        </div>
        <table className={styles.eight}>
        <tr>
            <ReadRoomSeat readRoom={readRoom*44+30} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+31} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+32} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+33} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+34} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+35} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+36} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+37} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
        </table>
        <table className={styles.six}>
        <tr>
            <ReadRoomSeat readRoom={readRoom*44+38} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+39} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+40} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
          <tr>
            <ReadRoomSeat readRoom={readRoom*44+41} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+42} setSeat={setSeat} seat={seat} test={test}/>
            <ReadRoomSeat readRoom={readRoom*44+43} setSeat={setSeat} seat={seat} test={test}/>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ReadRoomMap;
