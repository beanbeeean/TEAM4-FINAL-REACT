import React, { useState } from "react";
import styles from "../css/StudyRoom.module.css";
import Carousel from "react-bootstrap/Carousel";
import StudyRoomReservation from "./components/StudyRoomReservation";

const StudyHome = () => {
  const [space, setSpace] = useState(0);

  return (
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
        <StudyRoomReservation />
      )}
    </div>
  );
};

export default StudyHome;
