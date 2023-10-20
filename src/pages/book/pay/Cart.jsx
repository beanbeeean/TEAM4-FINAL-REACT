import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./css/Cart.module.css";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import CartProductNav from "./CartProductNav";

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
