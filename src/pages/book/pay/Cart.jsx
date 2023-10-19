import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./css/Cart.module.css";
import CartItem from "./CartItem";

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
      <Row className={styles.cart_nav}>
        <Col className={styles.nav_item} md={6}>
          상품정보
        </Col>
        <Col className={styles.nav_item} md={2}>
          수량
        </Col>
        <Col className={styles.nav_item} md={2}>
          상품금액
        </Col>
        <Col className={styles.nav_item} md={2}>
          주문
        </Col>
      </Row>

      <CartItem />
    </Container>
  );
};

export default Cart;
