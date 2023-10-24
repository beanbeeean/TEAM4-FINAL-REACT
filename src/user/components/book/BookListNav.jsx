import React from "react";
import { Link } from "react-router-dom";
import styles from "../../css/book/BookListNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const BookListNav = () => {
  return (
    <div>
      <input
        className={styles.book_search}
        type="text"
        placeholder="도서 검색"
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={styles.book_search_btn}
      />

      <ul className={styles.booklist_nav}>
        <Link to="/">
          <li>종합</li>
        </Link>
        <Link to="/">
          <li>신간</li>
        </Link>
        <Link to="/">
          <li>추천도서</li>
        </Link>
        <Link to="/">
          <li>베스트셀러</li>
        </Link>
      </ul>
    </div>
  );
};

export default BookListNav;
