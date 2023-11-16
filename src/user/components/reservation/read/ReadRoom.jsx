import React, { useEffect, useState } from "react";
import ReadRoomReservation from "./ReadRoomReservation";
import ReadRoomMap from "./ReadRoomMap";
import styles from "../../../css/reservation/ReadRoom.module.css";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
import { test } from "../../common/login/APIUtils";
import { seatChk } from "../../../../redux/user/slices/seatSlice";
import { useDispatch, useSelector } from "react-redux";

const ReadRoom = () => {
  const [readRoom, setReadRoom] = useState(1);
  const [seat, setSeat] = useState();
  const [test, setTest] = useState();

  const chk = useSelector((state) => state.seat.value);
  const dispatch = useDispatch();

  const changeReadRoom = (num) => {
    setSeat();
    setReadRoom(num);
  };

  const seatHandle = (event) => {
    axios
      .get(
        "http://libooks-nlb-4d85942f78544b5d.elb.ap-northeast-2.amazonaws.com:8080/read/seat?"
      )
      .then((response) => {
        console.log(response.data);
        setTest(response.data);
        // dispatch(seatChk());
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    seatHandle();
  }, [readRoom]);

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

      {test == null ? undefined : (
        <div className={styles.readroom_content}>
          <ReadRoomMap
            readRoom={readRoom - 1}
            setSeat={setSeat}
            seat={seat}
            test={test}
          />
          <ReadRoomReservation
            seat={seat}
            readRoom={readRoom}
            setTest={setTest}
          />
        </div>
      )}
    </div>
  );
};

export default ReadRoom;
