import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import styles from "../../css/book/BookCoutList.module.css";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";

const CheckoutListItem = ({ book }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Row>
      <Col className={styles.booklist_wrap} md={10}>
        <Link to={`/checkout_books/${book.b_no}`} key={book.b_no}>
          <div className={styles.book_item}>
            <span>{book.b_no}</span>
            <img src="../imgs/default.png" alt="Book Cover" />
            <div className={styles.content_wrap}>
              <ul>
                <li className={styles.book_title}>{book.b_title}</li>
                <li>
                  <span>{book.b_writer} 저</span>&nbsp;|&nbsp;
                  <span>{book.b_publisher}</span>
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </Col>
      <Col className={styles.buttons}>
        <div className={styles.buttons_wrap}>
          <span className={styles.ch_count}>대여 가능 수량 5</span>
          <br />
          <input
            type="button"
            value="대여하기"
            onClick={() => setModalShow(true)}
          />
          <CheckoutModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </Col>
    </Row>
  );
};

export default CheckoutListItem;
