import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import stylesAdmin from "../../css/reservation/StudyRoomSetting.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const getToday = () => {
  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth() + 1;
  let d = today.getDate();

  return y + "-" + m + "-" + d;
};
const StudyRoomSettingModal = (props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    setStartDate();
    setEndDate();
  }, [props.onHide]);
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
      <Modal.Body className={stylesAdmin.setting_modal_body}>
        <Form>
          <span className={stylesAdmin.modal_sub_title}>기본 정보</span>
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

          <Form.Group
            as={Row}
            controlId="studyRoomPrice"
            className="mb-3 pb-3"
            style={{ borderBottom: "1px solid #dadada" }}
          >
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
          <span className={stylesAdmin.modal_sub_title}>예약 불가 설정</span>
          <Form.Group as={Row} controlId="unableStart" className="mb-3">
            <Form.Label column sm={3}>
              시작일
            </Form.Label>
            <Col sm={9}>
              <Flatpickr
                className={stylesAdmin.set_unable_date}
                placeholder="클릭해서 시작일(시간)을 선택해주세요"
                style={{ width: "100%" }}
                data-enable-time
                value={startDate}
                options={{
                  minDate: "today",
                  minTime: "10:00",
                  maxTime: "22:00",
                }}
                onChange={(startDate) => setStartDate(startDate)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="unableEnd" className="mb-3">
            <Form.Label column sm={3}>
              종료일
            </Form.Label>
            <Col sm={9}>
              <Flatpickr
                className={stylesAdmin.set_unable_date}
                placeholder="클릭해서 시작일(시간)을 선택해주세요"
                style={{ width: "100%" }}
                data-enable-time
                value={endDate}
                options={{
                  minDate: "today",
                  minTime: "10:00",
                  maxTime: "22:00",
                }}
                onChange={(endDate) => setEndDate(endDate)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="unableDate" className="mb-3">
            <Form.Label column sm={3}>
              설정일
            </Form.Label>
            <Col className={stylesAdmin.setting_date} sm={9}>
              <Form.Control
                type="text"
                defaultValue="2023.10.26 08:00 ~ 2023.11.01 08:00"
                readOnly
              />
              <FontAwesomeIcon
                className={stylesAdmin.cancel_icon}
                icon={faCircleXmark}
              />
            </Col>
          </Form.Group>
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
