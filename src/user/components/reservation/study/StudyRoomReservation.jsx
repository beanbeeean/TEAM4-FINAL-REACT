import React, { useState } from "react";
import StudyRoomHeader from "./StudyRoomHeader";
import StudyRoomBody from "./StudyRoomBody";

const StudyRoomReservation = ({ space, setSpace }) => {
  const [selectedTime, setSelectedTime] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [price, setPrice] = useState();
  const [chosenMonth, setChosenMonth] = useState(new Date().getMonth() + 1);
  const [chosenDay, setChosenDay] = useState(new Date().getDate());
  return (
    <>
      <StudyRoomHeader
        setChosenMonth={setChosenMonth}
        setChosenDay={setChosenDay}
      />
      <StudyRoomBody
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        price={price}
        setPrice={setPrice}
        space={space}
        setSpace={setSpace}
        chosenMonth={chosenMonth}
        chosenDay={chosenDay}
      />
    </>
  );
};

export default StudyRoomReservation;
