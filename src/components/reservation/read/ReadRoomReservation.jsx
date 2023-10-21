import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReservationModal from "./ReservationModal";

const ReadRoomReservation = ({num}) => {
    
    const [modalShow, setModalShow] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        // 컴포넌트가 언마운트되면 타이머를 정리
        return () => clearInterval(timerId);
    }, []);

    const handleButtonClick = (roomNumber) => {
        setModalShow(true);
        setSelectedSeat(roomNumber);
      };
    
    return (
        <div>
            제 {num} 열람실
            
            <Container>
                <Row>
                    <Col md={1}>
                        <button className="" onClick={() => handleButtonClick(1)}>1</button>
                    </Col>
                    <Col md={1}>
                        <button className="" onClick={() => handleButtonClick(2)}>2</button>
                    </Col>
                    <Col md={1}>
                        <button className="" onClick={() => handleButtonClick(2)}>3</button>
                    </Col>
                </Row>
                <Row>
                    <Col md={1}>
                        <button className="" onClick={() => handleButtonClick(1)}>4</button>
                    </Col>
                    <Col md={1}>
                        <button className="" onClick={() => handleButtonClick(2)}>5</button>
                    </Col>
                    <Col md={1}>
                        <button className="" onClick={() => handleButtonClick(2)}>6</button>
                    </Col>
                </Row>
            </Container>
            <ReservationModal show={modalShow} no={selectedSeat} time={currentTime} onHide={() => setModalShow(false)} />
              
        </div>
    );
}

export default ReadRoomReservation;
