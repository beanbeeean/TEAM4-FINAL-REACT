import React, { useEffect, useState } from "react";
import styles from "../../css/mypage/MypageBook.module.css";
import { Link } from "react-router-dom";
import ReturnBookModal from "../book/ReturnBookModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const MypageBookItem = ({ item }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  // console.log("item : ", item);

  const { bookDto } = useSelector((state) => state.book);
  const book = bookDto.filter((e) => e.b_no === item.b_no);
  console.log("book : ", book[0]);

  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className={styles.item_wrap}>
      <Link to={`/checkout_books/:id`}>
        <div className={styles.content_wrap}>
          <img src={book[0].b_cover} />
          <ul>
            <li className={styles.book_title}>{book[0].b_title}</li>
            <li>
              <span>{book[0].b_author} 저</span>&nbsp;|&nbsp;
              <span>{book[0].b_publisher}</span>
            </li>
          </ul>
        </div>
      </Link>
      <div className={styles.buttons_wrap}>
        <div className={styles.checkout_date}>
          <div>대여기간 : </div>
          {dateFormat(item.chk_b_start_date)} ~{" "}
          {dateFormat(item.chk_b_end_date)}
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
