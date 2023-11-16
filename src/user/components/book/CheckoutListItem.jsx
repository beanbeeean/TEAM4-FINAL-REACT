import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import styles from "../../css/book/BookCoutList.module.css";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";
import Swal from "sweetalert2";
import LoginModal from "../common/LoginModal";

const CheckoutListItem = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [unable, setUnable] = useState(true);

  const { userDto } = useSelector((state) => state.user);
  const { chkBookDto } = useSelector((state) => state.chkBook);

  const { bookDto } = useSelector((state) => state.book);
  

  const isChkBook = chkBookDto.filter(
    (e) => e.u_email === userDto.u_email && e.chk_b_state == 1
  );

  const user = useSelector((state) => state.user.flag);

  const loginChk = () => {
    if(!user){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "로그인이 필요합니다.",
        iconColor: "rgb(33, 41, 66)",
        showConfirmButton: true,
        timer: 3000, // 메시지를 표시한 후 3초 동안 대기
      }).then((result) => {
        setLoginModalShow(true)
      });
    } else {
      setModalShow(true);
    }
  }

  useEffect(() => {
    setUnable(true);
  }, [props]);

  useEffect(() => {
    isChkBook.map((item) => {
      if (item.b_no == props.book.b_no) {
        setUnable(false);
      }
    });
  }, [isChkBook]);

  return (
    <div className={styles.item_wrap}>
      <div>
        <Link to={`/checkout_books/${props.book.b_no}`}>
          <div className={styles.content_wrap}>
            <img src={props.book.b_cover} />
            <ul>
              <li className={styles.book_title}>{props.book.b_title}</li>
              <li>
                <span>{props.book.b_author} 저</span>&nbsp;|&nbsp;
                <span>{props.book.b_publisher}</span>
              </li>
            </ul>
          </div>
        </Link>
        <div className={styles.buttons_wrap}>
          <span className={styles.ch_count}>
            대여 가능 수량 <span>{props.book.b_stock}</span>
          </span>
          <br />
          {!unable ? (
            <input
              className={styles.checkoutDis_btn}
              type="button"
              value="대여중"
              disabled
            />
          ) : props.book.b_stock > 0 ? (
            <input
              className={styles.checkout_btn}
              type="button"
              value="대여하기"
              onClick={() => loginChk()}
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
            book={props.book}
          />
        </div>
      </div>
      <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)} />
    </div>
  );
};

export default CheckoutListItem;
