import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./css/Cart.module.css";
import CartItem from "../../../components/book/pay/CartItem";
import CartFooter from "../../../components/book/pay/CartFooter";
import CartProductNav from "../../../components/book/pay/CartProductNav";

const Cart = () => {
  return (
    <Container>
      <div className={styles.select}>
        <input type="checkbox" />
        <span>전체선택</span>
        <input type="button" value="주문하기" />
        <input type="button" value="삭제" />
      </div>
      <hr />
      <CartProductNav />
      <CartItem />
      <hr />
      <CartFooter />
    </Container>
  );
};

export default Cart;
