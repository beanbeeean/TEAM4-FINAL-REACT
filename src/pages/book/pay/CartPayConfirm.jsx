import React from "react";
import CartProductNav from "./CartProductNav";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import { Container } from "react-bootstrap";
import CartConfirmItem from "./CartConfirmItem";
import DeliveryForm from "./DeliveryForm";

const CartPayConfirm = () => {
  return (
    <Container>
      <h4>상품확인</h4>
      <hr />
      <CartProductNav />
      <CartConfirmItem />
      <hr />
      <h4>배송지</h4>
      <DeliveryForm />
      <CartFooter />
    </Container>
  );
};

export default CartPayConfirm;
