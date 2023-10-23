import React, { useEffect, useState } from "react";
import ReservationHeader from "./include/ReservationHeader";
import ReadRoom from "./read/ReadRoom";
import { useNavigate } from "react-router-dom/dist";
import StudyRoom from "./study/components/StudyRoom";
import StudyHome from "./study/StudyHome";

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
