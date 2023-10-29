import React, { useState } from "react";
import styles from "../../css/book/BookListNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";

const BookListNav = ({ onNavStateChange }) => {
  const [keyword, setKeyword] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);

  const searchBookHandler = () => {
    console.log("검색어 : ", keyword);

    axios
      .get(`/checkout_books/search` + keyword)
      .then((response) => {
        setSearchBooks(response.data.dtos);
        const searchbookDtos = response.data;
        console.log("bookDtos : ", searchbookDtos)

        // dispatch(bookActions.fetchBookDto(bookDtos));
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <input
        className={styles.book_search}
        type="text"
        placeholder="도서 검색"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={styles.book_search_btn}
        onClick={searchBookHandler}
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
