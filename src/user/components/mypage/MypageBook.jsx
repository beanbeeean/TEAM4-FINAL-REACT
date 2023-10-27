import React, { useState } from "react";
import styles from "../../css/mypage/MypageBook.module.css";
import { Link } from "react-router-dom";
import ReturnBookModal from "../book/ReturnBookModal";
import MypageBookItem from "./MypageBookItem";

const MypageBook = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className={styles.mybook_cnt}>총 5권 대여중</div>
      <MypageBookItem />
      <MypageBookItem />
      <MypageBookItem />
      <MypageBookItem />
      <MypageBookItem />
      <MypageBookItem />
    </>
  );
};

export default MypageBook;
