import React, { useEffect, useState } from "react";
import StudyRoomHeader from "./StudyRoomHeader";
import StudyRoomBody from "./StudyRoomBody";

const StudyRoomReservation = ({ space, setSpace }) => {
  const [selectedTime, setSelectedTime] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [price, setPrice] = useState();
  const [chosenMonth, setChosenMonth] = useState(new Date().getMonth() + 1);
  const [chosenDay, setChosenDay] = useState(new Date().getDate());
  const [monthState, setMonthState] = useState(0);
  const [load, setLoad] = useState(false);

  
  useEffect(() => {
    console.log(chosenDay);

  }, [chosenDay]);

  return (
    <>
      <StudyRoomHeader
        setChosenMonth={setChosenMonth}
        setChosenDay={setChosenDay}
        setMonthState={setMonthState}
        setLoad={setLoad}
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
        monthState={monthState}
        load={load}
        setLoad={setLoad}
      />
    </>
  );
};

export default StudyRoomReservation;
