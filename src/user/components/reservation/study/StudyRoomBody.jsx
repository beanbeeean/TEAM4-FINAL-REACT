import React, { useEffect, useState } from "react";
import styles from "../../../css/reservation/StudyRoom.module.css";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Bootpay from "@bootpay/client-js";
import { chkRoom } from "../../common/login/APIUtils";
import ReservationModal from "./ReservationModal";

const getBusinessHours = (start, end) => {
  const hours = [];
  for (let i = start; i <= end; i++) {
    hours.push(i);
  }
  return hours;
};

const StudyRoomBody = ({
  selectedTime,
  setSelectedTime,
  selectedRoom,
  setSelectedRoom,
  price,
  setPrice,
  space,
  setSpace,
  chosenMonth,
  chosenDay,
  monthState,
}) => {
  const [times, setTimes] = useState(getBusinessHours(8, 22));
  const [spaceNum, setSpaceNum] = useState();
  const [impossible, setImpossible] = useState();
  const [load, setLoad] = useState(false);
  const [selectMonth, setSelectMonth] = useState(null);
  const [selectday, setSelectday] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [maxTime, setMaxTime] = useState(0);
  const [selectRoom, setSelectRoom] = useState(0);

  const now = new Date();
  const month = now.getMonth()+1;
  const year = now.getFullYear();
  const date = chosenDay + month * 100 + year * 10000;
  

  const chkroom = (e) => {
    setSpace(e);
    chkRoom({ date , space:e})
      .then(response => {
        console.log(response);
        setImpossible(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  const roomNames = [
    "SPACE1 - A",
    "SPACE1 - B",
    "SPACE2 - A",
    "SPACE2 - B",
    "SPACE3 - A",
    "SPACE3 - B",
  ];

  const userSelect = (num, time) => {

    console.log(num);
    
    setSelectMonth(chosenMonth);
    setSelectday(chosenDay);
    setSelectedTime(time);
    setSelectRoom(num);

    for(let i = 0; i < 3; i++){
      console.log(impossible[num][time]);
      if(impossible[num][time + i] == 0){
        setMaxTime(i);
      } else {
        break;
      }
    }
    for (let i = 0; i < roomNames.length; i++) {
      if (i == num) {
        setSelectedRoom(roomNames[i]);
        if (roomNames[i].includes("1")) {
          setPrice(1000);
        } else if (roomNames[i].includes("2")) {
          setPrice(2000);
        } else if (roomNames[i].includes("3")) {
          setPrice(3000);
        }
      }
    }
  };
  useEffect(() => {
    chkRoom({date, space})
    .then(response => {
      if(!load){
        setImpossible(response.data);
      }
      setLoad(true);
    })
    .catch(error => {
    });
  }, [impossible]);

  useEffect(() => {
    if (space == 1) {
      setSpaceNum([0, 1]);
    } else if (space == 2) {
      setSpaceNum([2, 3]);
    } else if (space == 3) {
      setSpaceNum([4, 5]);
    }
  }, [space]);

  const [paymentResponse, setPaymentResponse] = useState(null);

  const handlePayment = async () => {

    setModalShow(true);
  };

  return (<>{load ? (
    <div className={styles.study_reservation_wrap}>
      <ul className={styles.study_reservation_tap}>
        <li
          onClick={() => chkroom(1)}
          className={`${space == 1 && styles.reservation_tap_active}`}
        >
          SPACE1(2~4인)
        </li>
        <li
          onClick={() => chkroom(2)}
          className={`${space == 2 && styles.reservation_tap_active}`}
        >
          SPACE2(4~6인)
        </li>
        <li
          onClick={() => chkroom(3)}
          className={`${space == 3 && styles.reservation_tap_active}`}
        >
          SPACE3(6~8인)
        </li>
      </ul>
      <Row>
        <Col>
          <div className={styles.study_reservation_date}>
            <table>
              <thead>
                {space == 1 ? (
                  <tr>
                    <th>Time</th>
                    <th>SPACE1 - A</th>
                    <th>SPACE1 - B</th>
                  </tr>
                ) : space == 2 ? (
                  <tr>
                    <th>Time</th>
                    <th>SPACE2 - A</th>
                    <th>SPACE2 - B</th>
                  </tr>
                ) : space == 3 ? (
                  <tr>
                    <th>Time</th>
                    <th>SPACE3 - A</th>
                    <th>SPACE3 - B</th>
                  </tr>
                ) : (
                  ""
                )}
              </thead>
              <tbody>
                {times.map((t) => (
                  <tr>
                    <td>{t}:00</td>
                    {impossible[spaceNum[0]][t]? <td className={`${styles.reservation_badge}`}>예약 불가</td>: 
                  
                    <td
                      onClick={() => userSelect(spaceNum[0], t)}
                      className={`${styles.reservation_enable} `}
                    >
                      예약 가능
                    </td>  
                    }
                    {impossible[spaceNum[1]][t]? <td className={`${styles.reservation_badge}`}>예약 불가</td>: 
                    <td
                      onClick={() => userSelect(spaceNum[1], t)}
                      className={`${styles.reservation_enable}`}
                    >
                      예약 가능
                    </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
        <Col>
          <div className={styles.study_reservation_confirm}>
            <div className={styles.reservation_confirm_card}>
              <h3 className={styles.reservation_card_title}>
                &nbsp;사용자 선택 정보
              </h3>
              <div className={styles.reservation_card_table}>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>StudyRoom</th>
                      <th>Costs per hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {/* {chosenMonth + (monthState === 1 ? 1 : 0)}
                        {chosenDay > 0 && "." + chosenDay} */}
                        {selectMonth==null ? "" :selectMonth+"."+selectday}
                      </td>
                      <td>{selectedTime > 7 ? selectedTime + ":00" : ""}</td>
                      <td>{selectedRoom}</td>
                      <td>{price > 0 && "\\" + price}</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  className={styles.reservation_card_btn}
                  onClick={handlePayment}
                >
                  예약하기
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ReservationModal 
        show={modalShow}
        maxTime={maxTime}
        price={price}
        selectRoom={selectRoom}
        date={date}
        selectedTime={selectedTime}
        selectedRoom={selectedRoom}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
      />
    </div>):""}</>
  );
};

export default StudyRoomBody;
