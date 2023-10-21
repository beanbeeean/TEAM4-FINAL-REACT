import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/BookListNav.module.css";

const BookListNav = () => {
  return (
    <div>
      <input
        className={styles.book_search}
        type="text"
        placeholder="도서 검색"
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
