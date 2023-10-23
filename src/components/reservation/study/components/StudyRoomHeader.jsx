import React, { useState, useEffect, useMemo, useRef } from "react";

import Year from "react-live-clock";
import Month from "react-live-clock";
import styles from "../../css/StudyRoom.module.css";

const StudyRoomHeader = () => {
  const now = new Date();
  const todayWeak = now.getDay();
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const [daylist, setDaylist] = useState([]);
  const [weaklist, setWeaklist] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);

  const getAlldate = (today, lastday) => {
    let dates = [];

    dates[0] = today;
    for (let i = 1; i <= 6; i++) {
      today++;
      //마지막 날보다 날짜가 클경우 today를 1로 초기화.
      if (today > lastday) {
        today = 1;
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

  useEffect(() => {
    return () => console.log("Clean up");
  });

  const Weak = useRef(null);
  return (
    <>
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
                onClick={() => setSelectedDay(index)}
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
      </div>
    </>
  );
};

export default StudyRoomHeader;
