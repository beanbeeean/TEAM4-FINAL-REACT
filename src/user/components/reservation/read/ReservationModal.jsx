import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const ReservationModal = (props) => {

  const reservation = (e) => {

    let today = new Date(); 
    today.setHours(today.getHours() + 11); 
    const time = today.toISOString().replace('T', ' ').slice(0, 19);
    axios.post('http://localhost:8090/read/reservation', {
      re_room_no: props.readRoom,
      re_seat: props.seat,
      re_reservation: time, 
    })
    .then(response => {
      console.log(response.data);
      // dispatch(seatChk());
      axios.get('http://localhost:8090/read/seat?')
      .then(response => {
        console.log(response.data);
        props.setTest(response.data);
        // dispatch(seatChk());
        props.onHide(false);
        alert("좌석을 예약했습니다");
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
    console.log(props.readRoom +" "+props.seat +" "+time);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reservation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="seatNumber" className="mb-3">
            <Form.Label column sm={4}>
              좌석
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                defaultValue={
                  "제 " + props.readRoom + " 열람실 " + props.seat + "번"
                }
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="reservationTime" className="mb-3">
            <Form.Label column sm={4}>
              예약시간
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                defaultValue={
                  props.time.getHours() + "시 " + props.time.getMinutes() + "분"
                }
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="expirationTime" className="mb-3">
            <Form.Label column sm={4}>
              만료시간
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                defaultValue={
                  props.time.getHours() +
                  2 +
                  "시 " +
                  props.time.getMinutes() +
                  "분"
                }
                readOnly
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => reservation()}>예약</Button>
        <Button variant="secondary" onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;
