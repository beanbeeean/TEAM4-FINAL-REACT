import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../../css/book/BookCoutModal.module.css";

const CheckoutModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;

  const returnDate = `${date.getFullYear()}.${date.getMonth() + 1}.${
    date.getDate() + 7
  }`;

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
          <img className={styles.book_img} src="../imgs/default.png" />
        </div>
        <div className={styles.content}>
          <span className={styles.book_title}>도서명: </span>시영이는 귀엽다룽
        </div>
        <div className={styles.content}>
          <span className={styles.names}>저자명 / 출판사명 : </span>이시영 저 |
          홍재희
        </div>
        <div className={styles.content}>
          <span className={styles.checkout_date}>대여기간: </span>
          {today} ~ {returnDate} (7일간)
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.cout_btn}>대여하기</Button>
        <Button className={styles.cancle_btn} onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
