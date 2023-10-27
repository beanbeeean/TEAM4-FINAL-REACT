import React from "react";
import { Container } from "react-bootstrap";
import CartProductNav from "../../../components/book/cart/CartProductNav";
import CartConfirmItem from "../../../components/book/cart/CartConfirmItem";
import DeliveryForm from "../../../components/book/cart/DeliveryForm";
import CartFooter from "../../../components/book/cart/CartFooter";

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
