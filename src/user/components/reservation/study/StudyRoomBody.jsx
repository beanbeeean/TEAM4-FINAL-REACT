import React, { useEffect, useState } from "react";
import styles from "../../../css/reservation/StudyRoom.module.css";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Bootpay from "@bootpay/client-js";

const getBusinessHours = (start, end) => {
  const hours = [];
  for (let i = start; i <= end; i++) {
    hours.push(i);
  }
  return hours;
};

const StudyRoomBody = ({
  selectedTime,
  setSelectedTime,
  selectedRoom,
  setSelectedRoom,
  price,
  setPrice,
  space,
  setSpace,
  chosenMonth,
  chosenDay,
  monthState,
}) => {
  const [times, setTimes] = useState(getBusinessHours(8, 22));
  const [spaceNum, setSpaceNum] = useState();

  console.log("body -------------- monthState:", monthState);

  const roomNames = [
    "SPACE1 - A",
    "SPACE1 - B",
    "SPACE2 - A",
    "SPACE2 - B",
    "SPACE3 - A",
    "SPACE3 - B",
  ];

  const userSelect = (num, time) => {
    setSelectedTime(time);
    for (let i = 0; i < roomNames.length; i++) {
      if (i == num) {
        setSelectedRoom(roomNames[i]);
        if (roomNames[i].includes("1")) {
          setPrice(1000);
        } else if (roomNames[i].includes("2")) {
          setPrice(2000);
        } else if (roomNames[i].includes("3")) {
          setPrice(3000);
        }
      }
    }
  };

  useEffect(() => {
    if (space == 1) {
      setSpaceNum([0, 1]);
    } else if (space == 2) {
      setSpaceNum([2, 3]);
    } else if (space == 3) {
      setSpaceNum([4, 5]);
    }
  }, []);

  const [paymentResponse, setPaymentResponse] = useState(null);

  const handlePayment = async () => {
    console.log("bootpay");
    try {
      const response = await Bootpay.requestPayment({
        application_id: "652dd36500be04001b8e26f1", //가맹점ID
        price: 1000, // 총액 = items의 가격 합
        order_name: "스터디룸(2~4인)", // 상품명
        comapny_name: "파이널 4조",
        order_id: "TEST_ORDER_ID", // 고유 주문번호
        pg: "나이스페이", // 카카오, 토스, 나이스페이(카카오페이, 카드결제, 네이버페이 포함) 2개 회사는 확인
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
      //console.log(items);
      console.log(response);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.study_reservation_wrap}>
      <ul className={styles.study_reservation_tap}>
        <li
          onClick={() => setSpace(1)}
          className={`${space == 1 && styles.reservation_tap_active}`}
        >
          SPACE1(2~4인)
        </li>
        <li
          onClick={() => setSpace(2)}
          className={`${space == 2 && styles.reservation_tap_active}`}
        >
          SPACE2(4~6인)
        </li>
        <li
          onClick={() => setSpace(3)}
          className={`${space == 3 && styles.reservation_tap_active}`}
        >
          SPACE3(6~8인)
        </li>
      </ul>
      <Row>
        <Col>
          <div className={styles.study_reservation_date}>
            <table>
              <thead>
                {space == 1 ? (
                  <tr>
                    <th>Time</th>
                    <th>SPACE1 - A</th>
                    <th>SPACE1 - B</th>
                  </tr>
                ) : space == 2 ? (
                  <tr>
                    <th>Time</th>
                    <th>SPACE2 - A</th>
                    <th>SPACE2 - B</th>
                  </tr>
                ) : space == 3 ? (
                  <tr>
                    <th>Time</th>
                    <th>SPACE3 - A</th>
                    <th>SPACE3 - B</th>
                  </tr>
                ) : (
                  ""
                )}
              </thead>
              <tbody>
                {times.map((t) => (
                  <tr>
                    <td>{t}:00</td>
                    <td
                      onClick={() => userSelect(spaceNum[0], t)}
                      className={`${styles.reservation_enable} ${styles.reservation_badge}`}
                    >
                      예약 가능
                    </td>
                    <td
                      onClick={() => userSelect(spaceNum[1], t)}
                      className={`${styles.reservation_enable} ${styles.reservation_badge}`}
                    >
                      예약 가능
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
        <Col>
          <div className={styles.study_reservation_confirm}>
            <div className={styles.reservation_confirm_card}>
              <h3 className={styles.reservation_card_title}>
                &nbsp;사용자 선택 정보
              </h3>
              <div className={styles.reservation_card_table}>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>StudyRoom</th>
                      <th>Costs per hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {chosenMonth + (monthState === 1 ? 1 : 0)}
                        {chosenDay > 0 && "." + chosenDay}
                      </td>
                      <td>{selectedTime > 7 ? selectedTime + ":00" : ""}</td>
                      <td>{selectedRoom}</td>
                      <td>{price > 0 && "\\" + price}</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  className={styles.reservation_card_btn}
                  onClick={handlePayment}
                >
                  예약하기
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudyRoomBody;
