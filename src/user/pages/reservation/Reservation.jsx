import React, { useEffect, useState } from "react";
import ReservationHeader from "../../components/reservation/ReservationHeader";
import { useNavigate } from "react-router-dom/dist";
import StudyRoom from "./StudyRoom";
import ReadRoom from "../../components/reservation/read/ReadRoom";
import StudyHome from "../../components/reservation/study/StudyHome";

const Reservation = () => {
  const [category, setCategory] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (category == 1) {
      navigate("/reservation");
    } else if (category == 2) {
      navigate("/reservation");
    }
  }, [category]);
  return (
    <>
      <ReservationHeader category={category} setCategory={setCategory} />
      {category == 1 ? <ReadRoom /> : <StudyHome />}
      {/* <ReadRoom /> */}
    </>
  );
};

export default Reservation;
