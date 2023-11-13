import React, { useState } from "react";
import styles from "../../css/book/BookListNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { commonActions } from "../../../redux/common/slices/commonSlice";

const BookListNav = ({ bookMenu, onNavStateChange, onSearchBookChange }) => {
  const [keyword, setKeyword] = useState("");
  // const [selectedNav, setSelectedNav] = useState("all");
  const dispatch = useDispatch();
  console.log("bookMenu : ", bookMenu);
  const handleNavClick = (nav) => {
    // setSelectedNav(nav);
    dispatch(commonActions.setBookMenu(nav));
    onNavStateChange(nav);
  };

  return (
    <div>
      <div className={styles.book_header}>
        <h3 className={styles.board_title}>Book</h3>
        <ul className={styles.booklist_nav}>
          <li
            onClick={() => handleNavClick("all")}
            className={bookMenu === "all" ? styles.nav_selected : ""}
          >
            종합
          </li>
          <li
            onClick={() => handleNavClick("new")}
            className={bookMenu === "new" ? styles.nav_selected : ""}
          >
            신간
          </li>
          <li
            onClick={() => handleNavClick("bestseller")}
            className={bookMenu === "bestseller" ? styles.nav_selected : ""}
          >
            베스트셀러
          </li>
        </ul>
      </div>
      <div className={styles.search_box}>
        <input
          className={styles.book_search}
          type="text"
          placeholder="도서 검색"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.book_search_btn}
          onClick={() => onSearchBookChange(keyword)}
        />
      </div>
    </div>
  );
};

export default BookListNav;
