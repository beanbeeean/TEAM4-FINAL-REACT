import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ReservationModal = (props) => {
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
            <Form.Label column sm={4}>
              예약시간
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" defaultValue={"3시"} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="expirationTime" className="mb-3">
            <Form.Label column sm={4}>
              만료시간
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" defaultValue={"4시"} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="extensionCount" className="mb-3">
            <Form.Label column sm={4}>
              연장횟수
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" defaultValue="0" readOnly />
            </Col>
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