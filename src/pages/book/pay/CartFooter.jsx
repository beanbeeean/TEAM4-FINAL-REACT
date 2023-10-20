import React from "react";
import styles from "./css/Cart.module.css";

const CartFooter = () => {
  return (
    <div>
      <ul className={styles.total_price}>
        <li>상품 총 금액:</li>
        &nbsp;
        <li className={styles.total_product_price}>14,350원</li>
        &nbsp;&nbsp;&nbsp;
        <li>포인트 총 적립액 : </li>
        &nbsp;
        <li className={styles.point}>1,435원</li>
      </ul>
      <ul className={styles.select_pay}>
        <span className={styles.word}>선택한 상품</span>
        <input type="button" value="주문하기" />
        <input type="button" value="삭제" />
      </ul>
    </div>
  );
};

export default CartFooter;
