import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./css/CartItem.module.css";

const CartItem = () => {
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

  const confirmCnt = (e) => {
    console.log("confirmCnt");
  };

  return (
    <Row className={styles.book_wrap}>
      <Col md={6}>
        <div className={styles.booklist_wrap}>
          <div className={styles.book_item}>
            <input type="checkbox" />
            <img src="../imgs/default.png" />
            <div className={styles.content_wrap}>
              <ul>
                <li className={styles.book_title}>책 제목</li>
                <li>
                  <span>이시영 저</span> | <span>꿈빛파티시엘</span>
                </li>
                <li>
                  <span className={styles.sale_price}>99,999원</span>
                  <span className={styles.ori_price}>99,999원</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Col>
      <Col md={2}>
        <div className={styles.count_wrap}>
          <input type="button" value="-" onClick={decreaseCnt}></input>
          <input type="text" value={cnt} onChange={onChange}></input>
          <input type="button" value="+" onClick={increaseCnt}></input>
          <br />
          <input type="button" value="변경" onClick={confirmCnt} />
        </div>
      </Col>
      <Col md={2}>
        <p className={styles.book_price}>99,999원</p>
      </Col>
      <Col md={2}>
        <div className={styles.wrap}>
          <input className={styles.buy} type="button" value="주문하기"></input>
          <br />
          <input className={styles.delete} type="button" value="삭제"></input>
        </div>
      </Col>
    </Row>
  );
};

export default CartItem;
