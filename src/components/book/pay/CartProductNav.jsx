import React from "react";
import styles from "../../../pages/book/pay/css/Cart.module.css";
import { Col, Row } from "react-bootstrap";

const CartProductNav = () => {
  return (
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
  );
};

export default CartProductNav;
