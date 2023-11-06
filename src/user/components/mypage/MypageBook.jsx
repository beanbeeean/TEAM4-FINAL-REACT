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
import MypageBookAllItem from "./MypageBookAllItem";

const MypageBook = () => {
  const { userDto } = useSelector((state) => state.user);
  const { chkBookDto } = useSelector((state) => state.chkBook);
  const { bookDto } = useSelector((state) => state.book);
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(1);

  const dispatch = useDispatch();

  console.log("chkBookDto : ", chkBookDto);

  const [isNowChkBook, setIsNowChkBook] = useState(
    chkBookDto.filter(
      (e) => e.u_email === userDto.u_email && e.chk_b_state == 1
    )
  );

  const [chkedAllBook, setChkedAllBook] = useState(
    chkBookDto.filter(
      (e) => e.u_email === userDto.u_email && e.chk_b_state == 0
    )
  );

  const handleSelectChange = (event) => {
    console.log("selected :: ", selected);
    setSelected(event.target.value);
  };

  useEffect(() => {
    let arr = chkBookDto.filter(
      (e) => e.u_email === userDto.u_email && e.chk_b_state == 1
    );
    let list = chkBookDto.filter(
      (e) => e.u_email === userDto.u_email && e.chk_b_state == 0
    );
    setIsNowChkBook(arr);
    setChkedAllBook(list);
  }, [chkBookDto]);

  useEffect(() => {
    console.log("selected :: ", selected);
  }, [selected]);

  return (
    <>
      <div className={styles.mybook_cnt}>
        <select value={selected} onChange={handleSelectChange}>
          <option value="1">대여중</option>
          <option value="2">반납완료</option>
        </select>
        {selected == 1 ? (
          <>
            {sizeof(isNowChkBook) == 0 ? (
              <div className={styles.no_chkBook}>
                대여중인 책이 없습니다. <br />
                <Link to="/checkout_books">
                  <span>도서 대여하러 가기</span>
                </Link>
              </div>
            ) : (
              <>
                <span>총 {isNowChkBook.length}권 대여중</span>
                <div>
                  {isNowChkBook.map((item) => (
                    <MypageBookItem item={item} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <table className={styles.list_table}>
              <thead>
                <tr>
                  <th>책 제목</th>
                  <th>지은이</th>
                  <th>출판사</th>
                  <th>대여일자</th>
                  <th>반납일자</th>
                </tr>
              </thead>
              <tbody>
                {chkedAllBook.map((item) => (
                  <MypageBookAllItem item={item} />
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default MypageBook;
