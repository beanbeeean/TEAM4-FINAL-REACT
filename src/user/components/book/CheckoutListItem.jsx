import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import styles from "../../css/book/BookCoutList.module.css";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import axios from "axios";

const CheckoutListItem = ({ book }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className={styles.item_wrap}>
      <Link to={`/checkout_books/${book.b_no}`}>
        {/* <Link
        to={{
          to: `/checkout_books/${book.b_no}`,
          state: { book: { book } },
        }}
      > */}
        <div className={styles.content_wrap}>
          <img src={book.b_cover} />
          <ul>
            <li className={styles.book_title}>{book.b_title}</li>
            <li>
              <span>{book.b_author} 저</span>&nbsp;|&nbsp;
              <span>{book.b_publisher}</span>
            </li>
          </ul>
        </div>
      </Link>
      <div className={styles.buttons_wrap}>
        <span className={styles.ch_count}>
          대여 가능 수량 <span>{book.b_stock}</span>
        </span>
        <br />
        <input
          type="button"
          value="대여하기"
          onClick={() => setModalShow(true)}
        />
        <CheckoutModal
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
          book={book}
        />
      </div>
    </div>
  );
};

export default CheckoutListItem;
