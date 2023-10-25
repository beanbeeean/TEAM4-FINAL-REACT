import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const getToday = () => {
  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth() + 1;
  let d = today.getDate();

  return y + "-" + m + "-" + d;
};
const StudyRoomSettingModal = (props) => {
  const [startDate, setStartDate] = useState(getToday());
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          StudyRoom Setting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="roomName" className="mb-3">
            <Form.Label column sm={3}>
              스터디룸
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                defaultValue={props.roomName}
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="studyRoomPrice" className="mb-3">
            <Form.Label column sm={3}>
              가격 (1시간)
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                defaultValue={
                  props.roomName.includes("1")
                    ? 1000
                    : props.roomName.includes("2")
                    ? 2000
                    : props.roomName.includes("3")
                    ? 3000
                    : ""
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="studyRoomPrice" className="mb-3">
            <Form.Label column sm={3}>
              예약 불가
              <br />
              기간 설정
            </Form.Label>
            <Col sm={9}>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                // months={2}
                direction="horizontal"
              />
              {/* <Form.Control
                type="date"
                min={startDate}
                defaultValue={startDate}
              /> */}
            </Col>
            {/* <Col sm={4}>
              
            </Col> */}
          </Form.Group>
          {/* <Form.Group as={Row} controlId="studyRoomPrice" className="mb-3">
            <Form.Label column sm={4}>
              예약 불가 종료일
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="datetime-local"
                defaultValue={new Date()}
                
              />
            </Col>
           
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">저장</Button>
        <Button variant="secondary" onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudyRoomSettingModal;
