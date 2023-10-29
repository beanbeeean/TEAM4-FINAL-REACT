import React from "react";
import styles from "../../css/book/BookListNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const BookListNav = ({ onNavStateChange }) => {
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
        <li onClick={() => onNavStateChange("all")}>종합</li>
        <li onClick={() => onNavStateChange("new")}>신간</li>
        <li onClick={() => onNavStateChange("bestseller")}>베스트셀러</li>
      </ul>
    </div>
  );
};

export default BookListNav;
