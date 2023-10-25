import React, { useState } from "react";
import styles from "../../css/mypage/MypageBook.module.css";
import { Link } from "react-router-dom";
import ReturnBookModal from "../book/ReturnBookModal";

const MypageBookItem = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={styles.item_wrap}>
      <Link to={`/checkout_books/:id`}>
        <div className={styles.content_wrap}>
          <img src="../imgs/default.png" />
          <ul>
            <li className={styles.book_title}>책 제목</li>
            <li>
              <span>홍재희 저</span>&nbsp;|&nbsp;
              <span>이시영 출판사</span>
            </li>
          </ul>
        </div>
      </Link>
      <div className={styles.buttons_wrap}>
        <div className={styles.checkout_date}>
          <span>대여기간 : </span>2023.10.23 ~ 2023.10.30
        </div>
        <input
          type="button"
          value="반납하기"
          onClick={() => setModalShow(true)}
        />
        <ReturnBookModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default MypageBookItem;
