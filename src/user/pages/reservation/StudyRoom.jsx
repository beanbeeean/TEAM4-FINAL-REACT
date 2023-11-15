import React, { useEffect, useState } from "react";
import { Row, Col, Table, Card, Button } from "react-bootstrap";
import ReservationModal from "../../components/reservation/study/ReservationModal";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
// import ReservationHeader from "../ReservationHeader";

function StudyRoom() {
  const [selectedTime, setSelectedTime] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showTimeSelectionCard, setShowTimeSelectionCard] = useState(false);

  const user = useSelector((state) => state.user.flag);

  const loginChk = () => {
    if(!user){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "로그인이 필요합니다.",
        iconColor: "rgb(33, 41, 66)",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      setModalShow(true);
    }
  }

  const getDate = () => {
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    return year + "-" + month + "-" + date;
  };

  const times = Array.from({ length: 24 })
    .map((_, i) => {
      const hour = String(i).padStart(2, "0");
      return [`${hour}:00`];
    })
    .flat();

  const handleTimeClick = (time) => {
    setSelectedTime((prev) => {
      return [time];
    });
  };

  const handleButtonClick = (roomNumber) => {
    // setModalShow(true);
    // setSelectedSeat(roomNumber);
  };

  const reservationTime = () => {
    if (showTimeSelectionCard == false) setShowTimeSelectionCard(true);
    else setShowTimeSelectionCard(false);
  };

  useEffect(() => {}, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 className="text-center mb-4">스터디룸 예약</h2>

      <Card className="mb-4">
        <Card.Header>스터디룸 정보</Card.Header>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>날짜</th>
              <th>장소</th>
              <th>위치</th>
              <th>스터디룸</th>
              <th>예약 상태</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={reservationTime}>
              <td>10월 6일</td>
              <td>공예스터디</td>
              <td>B1 층</td>
              <td>Group RM A</td>
              <td>예약 가능</td>
            </tr>
            <tr onClick={reservationTime}>
              <td>10월 6일</td>
              <td>영어스터디</td>
              <td>B2 층</td>
              <td>Group RM A</td>
              <td>예약 가능</td>
            </tr>
            <tr onClick={reservationTime}>
              <td>10월 6일</td>
              <td>조각스터디</td>
              <td>B2 층</td>
              <td>Group RM A</td>
              <td>예약 가능</td>
            </tr>
          </tbody>
        </Table>
      </Card>

      {/* <Card className="mb-4">
        <Card.Header>예약 상황</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            스터디룸 A / B1 층 / Group RM (6인용)
            <ProgressBar variant="success" now={60} className="mt-2" />
          </ListGroup.Item>
        </ListGroup>
      </Card> */}

      {showTimeSelectionCard && (
        <Card className="mt-5">
          <Card.Header>이용시간 선택</Card.Header>
          <Card.Body>
            <p className="text-muted">
              ※ 선택 시간만큼 스터디룸을 사용하실 수 있습니다.
            </p>
            <Row>
              {times.map((time, index) => (
                <Col xs={3} className="mb-3" key={time}>
                  <Button
                    variant={
                      selectedTime.includes(time)
                        ? "primary"
                        : "outline-primary"
                    }
                    block
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </Button>
                </Col>
              ))}
            </Row>
          </Card.Body>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => loginChk()}
          >
            예약하기
          </Button>
        </Card>
      )}

      <ReservationModal
        show={modalShow}
        no={selectedSeat}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default StudyRoom;
