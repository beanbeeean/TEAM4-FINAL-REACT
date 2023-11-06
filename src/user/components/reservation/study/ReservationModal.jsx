import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Bootpay from "@bootpay/client-js";
import { reservationRoom } from "../../common/login/APIUtils";

const ReservationModal = (props) => {

  const [selectedTime, setSelectedTime] = useState([]);
  const [setTime, SetsetTime] = useState();

  const times = Array.from({ length: props.maxTime + 1 }).map((_, i) => {
    const hour = String(i + 1).padStart(2, '0');
    return [`${hour}`];
  }).flat();

  const handleTimeClick = (time) => {
    setSelectedTime((prev) => {
      SetsetTime(time);
      return [time];
    });
  };

  const handlePayment = async () => {
    const response = await Bootpay.requestPayment({
        application_id: "652dd36500be04001b8e26f1", //가맹점ID
        price: 1000, // 총액 = items의 가격 합
        order_name: props.selectedRoom, // 상품명
        comapny_name: "파이널 4조",
        order_id: "TEST_ORDER_ID", // 고유 주문번호
        pg: "카카오", // 카카오, 토스, 나이스페이(카카오페이, 카드결제, 네이버페이 포함) 2개 회사는 확인
        // method: "간편", // 카카오 - 간편, 토스 - 카드,
        tax_free: 0,
        user: {
          id: "abc123",
          username: "이시영",
          phone: "01012345678",
          email: "aaa@naver.com",
        },
        // 아이템이 JSON으로 담기면 됨. id는 product_id 써야할듯, qty price 맞아야함
        items: [
          {
            id: "space1",
            name: "space1(2~4인)",
            qty: 1,
            price: 1000,
          },
        ],
        extra: {
          open_type: "iframe",
          card_quota: "0,2,3",
          escrow: false,
        },
      });
      
      console.log("결제 : " + response);  

      if(response!=null){

        let data={
          sr_room:props.selectRoom, 
          sr_date:props.date,
          sr_time:props.selectedTime,
          time:setTime,
        };
        reservationRoom(data)
        .then(response => {
          props.setModalShow(false);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
      }
      
  }

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
              <Form.Control type="text" defaultValue={props.selectedRoom} readOnly />
            </Col>
            <Form.Label column sm={4}>
              가격
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" defaultValue={props.price} readOnly />
            </Col>
            <Form.Label column sm={4}>
              스터디룸
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" defaultValue={props.selectRoom} readOnly />
            </Col>
            <Form.Label column sm={4}>
              날짜
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" defaultValue={props.date} readOnly />
            </Col>
            <Form.Label column sm={4}>
              시간
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" defaultValue={props.selectedTime} readOnly />
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
                  {time + ":00"}
                </Button>
              </Col>
            ))}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePayment}>예약</Button>
        <Button variant="secondary" onClick={props.onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;



//   // 결제 응답을 백엔드로 보냅니다.
      //   if (response.event === "done") {
      //     setPaymentResponse(response);

      //     // 결제 정보 폼 생성
      //     const paymentData = {
      //       receiptId: response.data.receipt_id,
      //       userSeq: 1,
      //       convSeq: 1,
      //       pg: response.data.pg,
      //       method: response.data.method,
      //       discountInfo: "",
      //       price: response.data.price,
      //       purchasedAt: response.data.purchased_at
      //         .slice(0, 19)
      //         .replace("T", " "), // new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 시간 설정
      //       receiptUrl: response.data.receipt_url,
      //       cardNum: response.data.card_data
      //         ? response.data.card_data.card_no
      //         : null, // card_data가 존재하면 card_approve_no를 사용, 아니면 null
      //       cardCompany: response.data.card_data
      //         ? response.data.card_data.card_company
      //         : null,
      //     };

      //     // 결제 폼 전송
      //     axios
      //       .post("http://localhost:3000", paymentData)
      //       .then((response) => {
      //         console.log("결제 정보 전송 완료", response.data);

      //         // 결제가 완료되면 다시 axios
      //         if (response.data === "YES") {
      //           const items = [
      //             {
      //               receiptId: paymentData.receiptId,
      //               itemId: 1001,
      //               itemName: "space1",
      //               qty: 1,
      //               price: 1000,
      //             },
      //           ];

      //           // 결제 된 상품 목록 전송
      //           axios
      //             .post("http://localhost:3000", items)
      //             .then((response) => {
      //               console.log("결제 상품 목록 전송 완료", response.data);
      //             })
      //             .catch((error) => {
      //               console.error("결제 상품 목록 에러", error);
      //             });
      //         }
      //       })
      //       .catch((error) => {
      //         console.error("결제 정보 에러", error);
      //       });
      //   } else if (response.event === "cancel") {
      //     // 결제 취소 로직 안에 넣기
      //   } else {
      //     console.error("Payment failed:", response);
      //     // 실패한 경우의 처리
      //   }