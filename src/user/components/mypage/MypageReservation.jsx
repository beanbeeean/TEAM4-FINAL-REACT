import React, { useEffect, useState } from "react";
import styles from "../../css/mypage/MypageReservation.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { myPageRead, myPageStudy } from "../common/login/APIUtils";
import ReadReserveItem from "./ReadReserveItem";
import StudyReserveItem from "./StudyReserveItem";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { myPageAction } from "../../../redux/user/slices/myPageSlice";
import { Loading } from "../common/Loading";

const MypageReservation = () => {
  const currentDate = new Date();

  const startOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const endOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const startSetting = () => {
    let cloneStart = new Date(startOfCurrentMonth);
    cloneStart.setHours(0);
    cloneStart.setMinutes(0);
    cloneStart.setSeconds(0);
    return cloneStart;
  };

  const endSetting = () => {
    let cloneEnd = new Date(endOfCurrentMonth);
    cloneEnd.setHours(23);
    cloneEnd.setMinutes(59);
    cloneEnd.setSeconds(59);
    return cloneEnd;
  };

  const timeConvertHandler = (time, type) => {
    let clone = new Date(time);

    if (type) {
      setStart(time);
      clone.setHours(time.getHours() + 9);
      console.log(" stttt ", startDate);
      setStartDate(clone);
    } else {
      setEnd(time);
      clone.setHours(time.getHours() + 9);
      // clone.setDate(time.getDate() + 1);
      setEndDate(clone);
    }
  };

  const [startDate, setStartDate] = useState(startSetting());
  const [endDate, setEndDate] = useState(endSetting());
  const [seat, setSeat] = useState(null);
  const [study, setStudy] = useState(null);
  const [end, setEnd] = useState(endSetting());
  const [start, setStart] = useState(startSetting());
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.mypage);
  // if (seat == null) {
  //   myPageRead({ startDate, endDate })
  //     .then((response) => {
  //       // console.log("resresres :: ", response.data);
  //       console.log("11");
  //       if (response.data.length > 0) {
  //         setSeat(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //     });
  // }

  // if (study == null) {
  //   myPageStudy({ startDate, endDate })
  //     .then((response) => {
  //       // console.log("myPageStudy : ", response.data);
  //       console.log("22");
  //       if (response.data.length > 0) {
  //         setStudy(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //     });
  // }

  useEffect(() => {
    dispatch(myPageAction.setLoading(true));
  }, []);

  useEffect(() => {
    dispatch(myPageAction.setLoading(true));
    myPageRead({ startDate, endDate })
      .then((response) => {
        console.log("33");
        // console.log(response.data);

        if (response.data.length > 0) {
          setSeat(response.data);
          dispatch(myPageAction.setLoading(false));
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    myPageStudy({ startDate, endDate })
      .then((response) => {
        console.log("44");
        // console.log("myPageStudy : ", response.data);
        if (response.data.length > 0) {
          setStudy(response.data);
          console.log("startDate : ", startDate);
          console.log("endDate : ", endDate);
          dispatch(myPageAction.setLoading(false));
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [startDate, endDate]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "450px",
        }}
      >
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.reserve_wrap}>
      <div className={styles.datePicker_wrap}>
        <span>기간 설정 :&nbsp;</span>
        <ReactDatePicker
          className={styles.datePicker}
          selected={start}
          dateFormat="yyyy/MM/dd"
          onChange={(date) => timeConvertHandler(date, true)}
        />
        &nbsp;~&nbsp;
        <ReactDatePicker
          className={styles.datePicker}
          selected={end}
          dateFormat="yyyy/MM/dd"
          onChange={(date) => timeConvertHandler(date, false)}
        />
      </div>

      <div className={styles.reserve_tap}>
        <div className={styles.reserve_tap_item}>좌석발권</div>
        <div className={styles.reserve_tap_item}>스터디룸</div>
      </div>

      <div className={styles.reserve_list}>
        <div className={styles.reserve_seat_content}>
          {seat ? (
            seat.map((item, index) => <ReadReserveItem seat={item} />)
          ) : (
            <div className={styles.no_result}>예약 내역이 없습니다.</div>
          )}
        </div>

        <div className={styles.reserve_studyroom_content}>
          {study ? (
            study.map((item, index) => <StudyReserveItem study={item} />)
          ) : (
            <div className={styles.no_result}>예약 내역이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MypageReservation;
