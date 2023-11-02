import React, { useEffect, useState } from "react";
import styles from "../../css/mypage/MypageBook.module.css";
import { Link } from "react-router-dom";
import ReturnBookModal from "../book/ReturnBookModal";
import MypageBookItem from "./MypageBookItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";
import { bookActions } from "../../../redux/book/slices/bookSlice";
import { sizeof } from "stylis";

const MypageBook = () => {
  const { userDto } = useSelector((state) => state.user);
  const { chkBookDto } = useSelector((state) => state.chkBook);
  const { bookDto } = useSelector((state) => state.book);
  const [books, setBooks] = useState([]);

  const dispatch = useDispatch();

  const [isChkBook, setIsChkBook] = useState(
    chkBookDto.filter((e) => e.u_email === userDto.u_email)
  );

  useEffect(() => {
    let arr = chkBookDto.filter(
      (e) => e.u_email === userDto.u_email && e.chk_b_state == 1
    );
    setIsChkBook(arr);
  }, [chkBookDto]);

  return (
    <>
      {sizeof(isChkBook) == 0 ? (
        <div className={styles.no_chkBook}>
          대여한 책이 없습니다. <br />
          <Link to="/checkout_books">
            <span>도서 대여하러 가기</span>
          </Link>
        </div>
      ) : (
        <div className={styles.mybook_cnt}>총 {isChkBook.length}권 대여중</div>
      )}
      {isChkBook.map((item) => (
        <MypageBookItem item={item} />
      ))}
    </>
  );
};

export default MypageBook;
