import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./css/Cart.module.css";
import CartItem from "../../../components/book/pay/CartItem";
import CartFooter from "../../../components/book/pay/CartFooter";
import CartProductNav from "../../../components/book/pay/CartProductNav";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <Container>
      <div className={styles.select}>
        <input type="checkbox" />
        <span>전체선택</span>
      </div>
      <hr />
      <CartProductNav />
      <CartItem />
      <hr />
      {/* <CartFooter /> */}
      <div className={styles.total_price}>
        <span>상품 총 금액:</span>
        &nbsp;
        <span className={styles.total_product_price}>14,350원</span>
        &nbsp;&nbsp;&nbsp;
        <span>포인트 총 적립액 : </span>
        &nbsp;
        <span className={styles.point}>1,435원</span>
      </div>
      <div className={styles.btn}>
        <Link to="/cart/confirm">
          <input type="button" value="주문하기" />
        </Link>
        <input type="button" value="삭제" />
      </div>
    </Container>
  );
};

export default Cart;
