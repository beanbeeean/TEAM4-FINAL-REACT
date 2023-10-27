import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../../css/book/BookCoutModal.module.css";
import axios from "axios";

const CheckoutModal = (props) => {
  const [show, setShow] = useState(false);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${year}.${month}.${day}`;

  let daysInMonth = 0;

  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    daysInMonth = 31;
  } else if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth = 29;
    } else {
      daysInMonth = 28;
    }
  } else {
    daysInMonth = 30;
  }

  let returnDay = day + 7;

  let returnMonth = month;
  let returnYear = year;

  if (returnDay > daysInMonth) {
    returnDay -= daysInMonth;
    returnMonth++;
    if (returnMonth > 12) {
      returnMonth = 1;
      returnYear++;
    }
  }
  let returnDate = `${returnYear}.${returnMonth}.${returnDay}`;

  const checkoutBook = () => {
    console.log("checkoutBook");
    console.log("props.book.b_no: ", props.book.b_no);
    console.log("type : ", typeof props.book.b_no);

    axios
      .post(
        `http://127.0.0.1:8090/checkout_books/checkout/${props.book.b_no}`,
        props.book.b_no
      )
      .then((response) => {
        console.log("서버 응답 데이터:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
        <Modal.Title id="contained-modal-title-vcenter">
          Check-Out Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.img_wrap}>
          <img className={styles.book_img} src={props.book.b_cover} />
        </div>
        <div className={styles.content}>
          <div className={styles.book_title}>도서명: </div>
          {props.book.b_title}
        </div>
        <div className={styles.content}>
          <div className={styles.names}>저자명 / 출판사명 : </div>
          {props.book.b_author} 저 | {props.book.b_publisher}
        </div>
        <div className={styles.content}>
          <span className={styles.checkout_date}>대여기간: </span>
          {today} ~ {returnDate} (7일간)
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.cout_btn} onClick={checkoutBook}>
          대여하기
        </Button>
        <Button className={styles.cancle_btn} onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
