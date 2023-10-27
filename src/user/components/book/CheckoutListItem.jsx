import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import styles from "../../css/book/BookCoutList.module.css";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";

const CheckoutListItem = ({ book }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={styles.item_wrap}>
      <Link to={`/checkout_books/${book.b_no}`} key={book.b_no}>
        <div className={styles.content_wrap}>
          <img src="../imgs/default.png" />
          <ul>
            <li className={styles.book_title}>{book.b_title}</li>
            <li>
              <span>{book.b_writer} 저</span>&nbsp;|&nbsp;
              <span>{book.b_publisher}</span>
            </li>
          </ul>
        </div>
      </Link>
      <div className={styles.buttons_wrap}>
        <span className={styles.ch_count}>
          대여 가능 수량 <span>{book.b_count}</span>
        </span>
        <br />
        <input
          type="button"
          value="대여하기"
          onClick={() => setModalShow(true)}
        />
        <CheckoutModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default CheckoutListItem;
