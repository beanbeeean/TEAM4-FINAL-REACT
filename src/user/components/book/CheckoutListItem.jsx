import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import styles from "../../css/book/BookCoutList.module.css";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import axios from "axios";
import { useSelector } from "react-redux";

const CheckoutListItem = ({ book }) => {
  const [modalShow, setModalShow] = useState(false);
  const store = useSelector((state) => state);
  const [detailBook, setDetailBook] = useState(
    store.book.bookDto.filter((e) => e.b_no === book.b_no * 1)
  );

  useEffect(() => {
    let empty = [];
    empty = store.book.bookDto.filter((e) => e.b_no === book.b_no * 1).slice();
    setDetailBook(empty);
  }, []);

  return (
    <div className={styles.item_wrap}>
      {store.book.bookDto.length == 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <div>
          <Link to={`/checkout_books/${book.b_no}`}>
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
              대여 가능 수량 <span>{detailBook[0].b_stock}</span>
            </span>
            <br />
            {detailBook[0].b_stock > 0 ? (
              <input
                className={styles.checkout_btn}
                type="button"
                value="대여하기"
                onClick={() => setModalShow(true)}
              />
            ) : (
              <input
                className={styles.checkoutDis_btn}
                type="button"
                value="대여하기"
                disabled
              />
            )}
            <CheckoutModal
              show={modalShow}
              setModalShow={setModalShow}
              onHide={() => setModalShow(false)}
              book={book}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutListItem;
