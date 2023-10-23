import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ReservationModal = (props) => {

  const [selectedTime, setSelectedTime] = useState([]);

  const times = Array.from({ length: 3 }).map((_, i) => {
    const hour = String(i + 1).padStart(2, '0');
    return [`${hour}:00`];
  }).flat();

  const handleTimeClick = (time) => {
    setSelectedTime((prev) => {
      return [time];
    });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Reservation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="seatNumber" className="mb-3">
            <Form.Label column sm={4}>
              열람실
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" defaultValue={props.no} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="reservationTime" className="mb-3">
            <Form.Label column sm={12}>
              예약시간
            </Form.Label>
            {times.map((time, index) => (
              <Col sm={2} className="mb-3" key={time}>
                <Button 
                  variant={selectedTime.includes(time) ? 'primary' : 'outline-primary'}
                  block
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </Button>
              </Col>
            ))}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">예약</Button>
        <Button variant="secondary" onClick={props.onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;