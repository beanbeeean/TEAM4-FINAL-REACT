import React, { useEffect } from "react";
import styles from "../../css/common/RecommendItem.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../redux/book/slices/bookSlice";

const HomeRecommendItem = (book) => {
  console.log("book.book.b_no :: ", book.book.b_no);

  return (
    <Link to={`/checkout_books/${book.book.b_no}`}>
      <div className={styles.slide_block}>
        <img src={book.book.b_cover} />
        <div className={styles.text_wrap}>
          <span className={styles.title}>{book.book.b_title}</span>
          <span className={styles.author}>{book.book.b_author}&nbsp;</span>
          <span className={styles.publisher}>{book.book.b_publisher}</span>
        </div>
      </div>
    </Link>
  );
};

export default HomeRecommendItem;
