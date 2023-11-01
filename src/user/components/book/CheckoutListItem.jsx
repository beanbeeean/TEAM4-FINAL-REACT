import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import styles from "../../css/book/BookCoutList.module.css";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";

const CheckoutListItem = ({ navState, book, idx }) => {
  const [modalShow, setModalShow] = useState(false);
  const [unable, setUnable] = useState(true);

  const { userDto } = useSelector((state) => state.user);
  const { chkBookDto } = useSelector((state) => state.chkBook);
  // console.log("chkBookDto==========>", chkBookDto);

  const isChkBook = chkBookDto.filter((e) => e.u_email === userDto.u_email);
  console.log("isChkBook : ", isChkBook);

  useEffect(() => {
    isChkBook.map((item) => {
      if (item.b_no == book.b_no) {
        setUnable(false);
      }
    });
  }, [isChkBook]);

  return (
    <div className={styles.item_wrap}>
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
            대여 가능 수량 <span>{book.b_stock}</span>
          </span>
          <br />
          {!unable ? (
            <input
              className={styles.checkoutDis_btn}
              type="button"
              value="대여중"
              disabled
            />
          ) : book.b_stock > 0 ? (
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
    </div>
  );
};

export default CheckoutListItem;
