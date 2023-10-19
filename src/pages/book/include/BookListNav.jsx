import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/BookListNav.module.css";

const BookListNav = () => {
  return (
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
  );
};

export default BookListNav;
