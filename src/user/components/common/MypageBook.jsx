import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import styles from "../../css/common/MypageBook.module.css";
import { Link } from "react-router-dom";
import ReturnBookModal from "../book/ReturnBookModal";

const MypageBook = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={styles.content_wrap}>
      {/* <p>총 3권</p> */}
      <Row className={styles.book_nav}>
        <Col className={styles.booklist_wrap} md={7}>
          책제목
        </Col>
        <Col className={styles.booklist_wrap} md={2}>
          대여기간
        </Col>
        <Col className={styles.booklist_wrap} md={1}>
          반납현황
        </Col>
        <Col className={styles.booklist_wrap} md={1}>
          반납하기
        </Col>
      </Row>
      <Row>
        <Col className={styles.booklist_wrap} md={7}>
          <Link to={`/checkout_books`}>
            <div className={styles.book_item}>
              <img src="../imgs/default.png" alt="Book Cover" />
              <div className={styles.content_wrap}>
                <ul>
                  <li className={styles.book_title}>책이름인디요</li>
                  <li>
                    <span>이시영 저</span>&nbsp;|&nbsp;
                    <span>홍재희 생일</span>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        </Col>
        <Col className={`${styles.box} ${styles.booklist_wrap}`} md={2}>
          2023.10.24 ~ 2023.10.31
        </Col>
        <Col className={`${styles.box} ${styles.booklist_wrap}`} md={1}>
          X
        </Col>
        <Col className={styles.buttons}>
          <div className={styles.buttons_wrap}>
            <input
              type="button"
              value="반납하기"
              onClick={() => setModalShow(true)}
            />
            <ReturnBookModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MypageBook;
