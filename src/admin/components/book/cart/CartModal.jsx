import React from "react";
import styles from "../../css/common/CartModal.module.css";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";

const CartModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton> */}
      {/* </Modal.Header> */}
      <Modal.Body className={styles.modal_content}>
        <BsFillCartCheckFill size="80" className={styles.icon} />
        <br />
        상품이 장바구니에 담겼습니다.
        <br />
        바로 확인하시겠습니까?
      </Modal.Body>
      <Modal.Footer>
        <Link to="/cart">
          <Button className={styles.confirm_btn}>보러가기</Button>
        </Link>
        <Button className={styles.cancle_btn} onClick={props.onHide}>
          쇼핑 계속하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
