import React, { useEffect, useState } from "react";
import styles from "../../css/mypage/MypageBook.module.css";
import { Link } from "react-router-dom";
import ReturnBookModal from "../book/ReturnBookModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";

const MypageBookItem = ({ item }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const { bookDto } = useSelector((state) => state.book);
  const book = bookDto.filter((e) => e.b_no === item.b_no);

  return (
    <>
      {book[0] != undefined && (
        <div className={styles.item_wrap}>
          <Link to={`/checkout_books/${book[0].b_no}`}>
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
              {item.chk_b_start_date} ~ {item.chk_b_end_date}
            </div>
            <input
              type="button"
              value="반납하기"
              onClick={() => setModalShow(true)}
            />
            <ReturnBookModal
              book={book[0]}
              item={item}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MypageBookItem;
