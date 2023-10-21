import React from "react";
import CartProductNav from "../../../components/book/pay/CartProductNav";
import CartFooter from "../../../components/book/pay/CartFooter";
import { Container } from "react-bootstrap";
import CartConfirmItem from "../../../components/book/pay/CartConfirmItem";
import DeliveryForm from "../../../components/book/pay/DeliveryForm";

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
      <hr />
      <CartFooter />
    </Container>
  );
};

export default CartPayConfirm;
