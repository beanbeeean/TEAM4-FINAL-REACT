import React, { useState } from "react";
import StudyRoomHeader from "./StudyRoomHeader";
import StudyRoomBody from "./StudyRoomBody";

const StudyRoomReservation = () => {
  const [selectedTime, setSelectedTime] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [price, setPrice] = useState();
  const [chosenMonth, setChosenMonth] = useState();
  const [chosenDay, setChosenDay] = useState();
  return (
    <>
      <StudyRoomHeader />
      <StudyRoomBody
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        price={price}
        setPrice={setPrice}
      />
    </>
  );
};

export default StudyRoomReservation;
