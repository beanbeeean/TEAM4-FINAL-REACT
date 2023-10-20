import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./css/BookList.module.css";
import { Link } from "react-router-dom";

const BookListItem = ({ book }) => {
  const [cnt, setCnt] = useState(1);

  const decreaseCnt = () => {
    console.log("decreaseCnt");
    if (cnt > 1) {
      setCnt(cnt - 1);
    }
  };

  const increaseCnt = () => {
    console.log("increaseCnt");
    setCnt(cnt + 1);
  };

  const onChange = (e) => {
    console.log("onChange");

    const newValue = parseInt(e.target.value);

    if (!isNaN(newValue) && newValue >= 1) {
      setCnt(newValue);
    }
  };

  return (
    <Row>
      <Col className={styles.booklist_wrap} md={10}>
        <Link to={`/books/${book.b_no}`} key={book.b_no}>
          <div className={styles.book_item}>
            <span>{book.b_no}</span>
            <img src="../imgs/default.png" />
            <div className={styles.content_wrap}>
              <ul>
                <li className={styles.book_title}>{book.b_title}</li>
                <li>
                  <span>{book.b_writer} 저</span> |{" "}
                  <span>{book.b_publisher}</span>
                </li>
                <li>
                  <span className={styles.sale_price}>{book.b_sale_price}</span>
                  <span className={styles.ori_price}>{book.b_ori_price}</span>
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </Col>
      <Col className={styles.buttons}>
        <span className={styles.count}>수량</span>
        <input type="button" value="-" onClick={decreaseCnt}></input>
        <input type="text" value={cnt} onChange={onChange}></input>
        <input type="button" value="+" onClick={increaseCnt}></input>
        <br />
        <input className={styles.cart} type="button" value="장바구니"></input>
        <br />
        <input className={styles.buy} type="button" value="바로구매"></input>
      </Col>
    </Row>
  );
};

export default BookListItem;
