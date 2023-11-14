import React, { useEffect, useMemo, useState , useRef} from "react";
import styles from "../../../css/reservation/StudyRoom.module.css";
import Carousel from "react-bootstrap/Carousel";
import StudyRoomReservation from "./StudyRoomReservation";
import Bootpay from "@bootpay/client-js";
import axios from "axios";
import StudyRoomBody from "./StudyRoomBody";
import StudyRoomHeader from "./StudyRoomHeader";
import Year from "react-live-clock";
import Month from "react-live-clock";
import { chkRoom } from "../../common/login/APIUtils";
import { Col, Row } from "react-bootstrap";
import ReservationModal from "./ReservationModal";

const getBusinessHours = (start, end) => {
  const hours = [];
  for (let i = start; i <= end; i++) {
    hours.push(i);
  }
  return hours;
};

const StudyHome = () => {
  const [space, setSpace] = useState(0);
  const [click, setClick] = useState(0);

  const [selectedTime, setSelectedTime] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [price, setPrice] = useState();
  const [chosenMonth, setChosenMonth] = useState(new Date().getMonth() + 1);
  const [chosenDay, setChosenDay] = useState(new Date().getDate());
  const [monthState, setMonthState] = useState(0);
  const [load, setLoad] = useState(false);
  const now = new Date();
  const todayWeak = now.getDay();
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const [daylist, setDaylist] = useState([]);
  const [weaklist, setWeaklist] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);

  const [times, setTimes] = useState(getBusinessHours(8, 22));
  const [spaceNum, setSpaceNum] = useState();
  const [impossible, setImpossible] = useState();
  const [selectMonth, setSelectMonth] = useState(null);
  const [selectday, setSelectday] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [maxTime, setMaxTime] = useState(0);
  const [selectRoom, setSelectRoom] = useState(0);
  const month = now.getMonth()+1;
  const year = now.getFullYear();
  const date = chosenDay + month * 100 + year * 10000;


  let selectedIdx;

  const getAlldate = (today, lastday) => {
    let dates = [];

    dates[0] = today;
    for (let i = 1; i <= 6; i++) {
      today++;
      //마지막 날보다 날짜가 클경우 today를 1로 초기화.
      if (today > lastday) {
        today = 1;
        selectedIdx = i;
        dates[i] = today;
      }
      //일반 경우 그냥 날짜 추가
      else {
        dates[i] = today;
      }
    }

    //요일 정상적으로 뜨는지 확인해보자
    //console.log(dates[1].getDay());

    return dates;
  };

  const Alldate = useMemo(() => getAlldate(today, lastday), [daylist]);

  //요일 표시 평일 검정색, 토요일 파란색, 일요일 빨간색
  const getAllweak = (todayWeak) => {
    let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weaklist = [];

    //첫번째 오늘 날짜 적용

    weaklist[0] = strWeak[todayWeak];

    for (let i = 1; i <= 6; i++) {
      todayWeak++;
      if (todayWeak > 6) {
        todayWeak = 0;
        weaklist[i] = strWeak[todayWeak];
      } else {
        weaklist[i] = strWeak[todayWeak];
      }
    }

    return weaklist;
  };

  const CalendarDay = getAlldate(today, lastday);
  const CalendarWeak = getAllweak(todayWeak);

  /*⭐⭐날짜와 요일을 같이 표시하기위해서 만들어 놓은 객체
    날짜를 하나씩 출력해서 객체로 만들기위해서 함수를 실행시킨뒤
    분해로 하나씩 넣는 방법을 사용했음 ⭐⭐*/
  const CalendarObject = [
    { weak: CalendarWeak[0], day: CalendarDay[0] },
    { weak: CalendarWeak[1], day: CalendarDay[1] },

    { weak: CalendarWeak[2], day: CalendarDay[2] },
    { weak: CalendarWeak[3], day: CalendarDay[3] },
    { weak: CalendarWeak[4], day: CalendarDay[4] },
    { weak: CalendarWeak[5], day: CalendarDay[5] },
    { weak: CalendarWeak[6], day: CalendarDay[6] },
  ];

  const Weak = useRef(null);

  const setDateData = (idx, day) => {
    console.log("idx:", idx);
    console.log("selectedIdx-1 :", selectedIdx - 1);

    if (idx > selectedIdx - 1) {
      setMonthState(1);
    } else {
      setMonthState(0);
    }

    setSelectedDay(idx);
    setLoad(false);
    setChosenDay(day);
  };

  useEffect(() => {
    console.log(chosenDay);

  }, [chosenDay]);

  const chkroom = (e) => {
    setSpace(e);
    setLoad(false);
    setClick(1);
    chkRoom({ date , space:e})
      .then(response => {
        // console.log(response);
        // setImpossible(response.data);
        let impossible = response.data
        setImpossible(impossible.slice());
        console.log("3333")
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
        let impossible = response.data
        setImpossible(impossible.slice());
        console.log("3333")
      }
      setLoad(true);
    })
    .catch(error => {
    });
  }, [impossible,chosenDay]);

  // useEffect(() => {
  //   console.log(chosenDay);
  //   chkRoom({date, space})
  //   .then(response => {
  //     if(!load){
  //       setImpossible(response.data);
  //     }
  //     setLoad(true);
  //   })
  //   .catch(error => {
  //   });
  // }, [chosenDay]);

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

  return (

    <>
      <div className={styles.studyroom_items}>
        <div className={styles.studyroom_item}>
          <span
            className={`${space == 1 && styles.reservation_tap_active}`}
             onClick={() => chkroom(1)}
            // className={`${space == 1 && styles.reservation_tap_active}`}
          >
            SPACE1(2~4인)
          </span>
          <img
            className={styles.studyroom_img}
            src="../imgs/space-4_3.jpeg"
            alt=""
          />
        </div>
        <div className={styles.studyroom_item}>
          <span
          className={`${space == 2 && styles.reservation_tap_active}`}
           onClick={() => chkroom(2)}
          // className={`${space == 1 && styles.reservation_tap_active}`}
          >
            SPACE2(4~6인)
          </span>
          <img
            className={styles.studyroom_img}
            src="../imgs/space-6_3.jpeg"
            alt=""
          />
        </div>
        <div className={styles.studyroom_item}>
          <span
          className={`${space == 3 && styles.reservation_tap_active}`}
           onClick={() => chkroom(3)}
          // className={`${space == 1 && styles.reservation_tap_active}`}
          >
            SPACE3(6~8인)
          </span>
          <img
            className={styles.studyroom_img}
            src="../imgs/space-8_3.jpeg"
            alt=""
          />
        </div>
      </div>
      { click==0 ? "":
        <div className={styles.calendar}>
        <div className={styles.year_month_list}>
          <p>
            <span className={styles.year}>
              <Year
                id="Year"
                format={"YYYY"}
                ticking={false}
                timezone={"KR/Pacific"}
              />
            </span>
            &nbsp;&nbsp;
            <span className={styles.month}>
              <Month format={"MMMM"} ticking={false} timezone={"KR/Pacific"} />
            </span>
          </p>
        </div>
        <div className={styles.day_list} ticking={false}>
          <div className={styles.day_list_container}>
            {CalendarObject.map((calendar, index) => (
              <div
                onClick={() => setDateData(index, calendar.day)}
                className={`${styles.day_list_area} ${
                  selectedDay == index ? styles.selected_day : ""
                } `}
              >
                <div
                  className={`${styles.weak} ${
                    calendar.weak === "Sun" && styles.sun
                  }
                 ${calendar.weak === "Sat" && styles.sat}`}
                  ref={Weak}
                >
                  {calendar.weak}
                </div>
                <div className={styles.day}>{calendar.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>}
      { click == 0 ? "" : load? (
    <div className={styles.study_reservation_wrap}>
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
    </div>):""}
    </>
   
  );
};

export default StudyHome;



{/* 
const [space, setSpace] = useState(0);
<div className={styles.study_wrap}>
{space == 0 ? (
  <Carousel data-bs-theme="dark">
    <Carousel.Item onClick={() => setSpace(1)}>
      <img
        className={styles.carousel_img}
        src="../imgs/space-4_3.jpeg"
        alt=""
      />
      <Carousel.Caption>
        <h3>SPACE1(4인실)</h3>
        <p>예약하기</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item onClick={() => setSpace(2)}>
      <img
        className={styles.carousel_img}
        src="../imgs/space-6_3.jpeg"
        alt=""
      />
      <Carousel.Caption>
        <h3>SPACE2(6인실)</h3>
        <p>예약하기</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item onClick={() => setSpace(3)}>
      <img
        className={styles.carousel_img}
        src="../imgs/space-8_3.jpeg"
        alt=""
      />
      <Carousel.Caption>
        <h3>SPACE3(8인실)</h3>
        <p>예약하기</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
) : (
  <StudyRoomReservation space={space} setSpace={setSpace} />
)}
</div> */}