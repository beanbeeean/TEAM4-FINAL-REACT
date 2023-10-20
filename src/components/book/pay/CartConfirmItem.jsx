import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./css/CartConfirmItem.module.css";

const CartConfirmItem = () => {
  return (
    <Row className={styles.book_wrap}>
      <Col md={6}>
        <div className={styles.booklist_wrap}>
          <div className={styles.book_item}>
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
        <p className={styles.count_wrap}>1</p>
      </Col>
      <Col md={2}>
        <p className={styles.book_price}>99,999원</p>
      </Col>
      <Col md={2}>
        <p className={styles.book_total_price}>99,999원</p>
      </Col>
    </Row>
  );
};

export default CartConfirmItem;
