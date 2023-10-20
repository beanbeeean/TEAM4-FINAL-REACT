import React, { useState } from "react";
import styles from "../../../pages/book/pay/css/Cart.module.css";
import { Row } from "react-bootstrap";
import axios from "axios";
import { Bootpay } from "@bootpay/client-js";

const CartFooter = () => {
  const [paymentResponse, setPaymentResponse] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await Bootpay.requestPayment({
        application_id: "652dd36500be04001b8e26f1", //가맹점ID
        price: 500, // 총액 = items의 가격 합
        order_name: "결제 상품 명", // 상품명
        comapny_name: "파이널 도서",
        order_id: "TEST_ORDER_ID", // 고유 주문번호
        pg: "카카오", // 카카오, 토스, 나이스페이(카카오페이, 카드결제, 네이버페이 포함) 2개 회사는 확인
        method: "간편", // 카카오 - 간편, 토스 - 카드,
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
            id: "item_id",
            name: "먹태깡",
            qty: 1,
            price: 100,
          },
          {
            id: "item_id2",
            name: "테스트아이템2",
            qty: 2,
            price: 200,
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

      // 결제 응답을 백엔드로 보냅니다.
      if (response.event === "done") {
        setPaymentResponse(response);

        // 결제 정보 폼 생성
        const paymentData = {
          receiptId: response.data.receipt_id,
          userSeq: 1,
          convSeq: 1,
          pg: response.data.pg,
          method: response.data.method,
          discountInfo: "",
          price: response.data.price,
          purchasedAt: response.data.purchased_at
            .slice(0, 19)
            .replace("T", " "), // new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 시간 설정
          receiptUrl: response.data.receipt_url,
          cardNum: response.data.card_data
            ? response.data.card_data.card_no
            : null, // card_data가 존재하면 card_approve_no를 사용, 아니면 null
          cardCompany: response.data.card_data
            ? response.data.card_data.card_company
            : null,
        };

        // 결제 폼 전송
        axios
          .post("http://localhost:3000", paymentData)
          .then((response) => {
            console.log("결제 정보 전송 완료", response.data);

            // 결제가 완료되면 다시 axios
            if (response.data === "YES") {
              const items = [
                {
                  receiptId: paymentData.receiptId,
                  itemId: 1001,
                  itemName: "먹태깡",
                  qty: 1,
                  price: 100,
                },
                {
                  receiptId: paymentData.receiptId,
                  itemId: 1001,
                  itemName: "오렌지 음료",
                  qty: 4,
                  price: 100,
                },
              ];

              // 결제 된 상품 목록 전송
              axios
                .post("http://localhost:3000", items)
                .then((response) => {
                  console.log("결제 상품 목록 전송 완료", response.data);
                })
                .catch((error) => {
                  console.error("결제 상품 목록 에러", error);
                });
            }
          })
          .catch((error) => {
            console.error("결제 정보 에러", error);
          });
      } else if (response.event === "cancel") {
        // 결제 취소 로직 안에 넣기
      } else {
        console.error("Payment failed:", response);
        // 실패한 경우의 처리
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row>
      <div className={styles.total_price}>
        <span>상품 총 금액:</span>
        &nbsp;
        <span className={styles.total_product_price}>14,350원</span>
        &nbsp;&nbsp;&nbsp;
        <span>포인트 총 적립액 : </span>
        &nbsp;
        <span className={styles.point}>1,435원</span>
      </div>
      <div className={styles.select_pay}>
        <input type="button" value="결제하기" onClick={handlePayment} />
        <input type="button" value="삭제" />
      </div>
    </Row>
  );
};

export default CartFooter;
