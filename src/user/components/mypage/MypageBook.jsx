import React, { useEffect, useState } from "react";
import styles from "../../css/mypage/MypageBook.module.css";
import { Link } from "react-router-dom";
import ReturnBookModal from "../book/ReturnBookModal";
import MypageBookItem from "./MypageBookItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";
import { bookActions } from "../../../redux/book/slices/bookSlice";

const MypageBook = () => {
  const { userDto } = useSelector((state) => state.user);
  const { chkBookDto } = useSelector((state) => state.chkBook);
  const [books, setBooks] = useState([]);

  const dispatch = useDispatch();

  const isChkBook = chkBookDto.filter((e) => e.u_email === userDto.u_email);
  // console.log("isChkBook : ", isChkBook);

  useEffect(() => {
    axios
      .get(`/checkout_books/home`, {
        params: {},
      })
      .then((response) => {
        const bookDtos = response.data;
        dispatch(bookActions.fetchBookDto(bookDtos));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={styles.mybook_cnt}>총 5권 대여중</div>
      {isChkBook.map((item) => (
        <MypageBookItem item={item} />
      ))}
    </>
  );
};

export default MypageBook;
