import React, { useEffect, useState } from "react";
import ReservationHeader from "./include/ReservationHeader";
import ReadRoom from "./read/ReadRoom";
import { useNavigate } from "react-router-dom/dist";

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
      <ReadRoom />
    </>
  );
};

export default Reservation;
