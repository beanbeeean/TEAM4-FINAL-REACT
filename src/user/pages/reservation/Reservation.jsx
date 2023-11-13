import React, { useEffect, useState } from "react";
import ReservationHeader from "../../components/reservation/ReservationHeader";
import { useNavigate } from "react-router-dom/dist";
import StudyRoom from "./StudyRoom";
import ReadRoom from "../../components/reservation/read/ReadRoom";
import StudyHome from "../../components/reservation/study/StudyHome";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../../redux/common/slices/commonSlice";

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reservationMenu } = useSelector((state) => state.common);
  // useEffect(() => {
  //   if (category == 1) {
  //     navigate("/reservation");
  //   } else if (category == 2) {
  //     navigate("/reservation");
  //   }
  // }, [category]);
  useEffect(() => {
    dispatch(commonActions.setMainMenu(2));
    dispatch(commonActions.setReservationMenu(1));
  }, []);
  return (
    <>
      <ReservationHeader />
      {reservationMenu == 1 ? <ReadRoom /> : <StudyHome />}
      {/* <ReadRoom /> */}
    </>
  );
};

export default Reservation;
