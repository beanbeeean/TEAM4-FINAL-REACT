import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesAdmin from "../../css/book/CoutUserModal.module.css";

const CheckoutUserModal = (props) => {
  const [show, setShow] = useState(false);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          잭과 콩나물 (15035)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={stylesAdmin.user_modal}>
        <table className={stylesAdmin.book_wrap}>
          <thead>
            <tr>
              <th>U_NO</th>
              <th>START DATE</th>
              <th>END DATE</th>
              <th>STATE</th>
              <th>CHANGE</th>
            </tr>
          </thead>
          <tbody>
            <tr className={stylesAdmin.user_item}>
              <td>5</td>
              <td>2023.10.20</td>
              <td>2023.10.30</td>
              <td>대여중</td>
              <td>
                <input type="button" value="반납" />
              </td>
            </tr>
            <tr className={stylesAdmin.user_item}>
              <td>5</td>
              <td>2023.10.20</td>
              <td>2023.10.30</td>
              <td>대여중</td>
              <td>
                <input type="button" value="반납" />
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button className={stylesAdmin.cancle_btn} onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutUserModal;
