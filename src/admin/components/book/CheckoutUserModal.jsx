import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesAdmin from "../../css/book/CoutUserModal.module.css";
import CheckoutUserList from "./CheckoutUserList";
import axios from "axios";

const CheckoutUserModal = (props) => {
  const [state, setState] = useState([]);
  console.log("props : ", props);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let arr = [];
    axios
      .get(`/admin/management/checkout_book_user_list${props.book.b_no}`)
      .then((response) => {
        const chkUserDtos = response.data;
        arr = Array.from(response.data.dtos);
        setUsers(arr);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("users : ", users);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.book.b_title} ({props.book.b_isbn})
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
            {users.map((user) => (
              <CheckoutUserList user={user} />
            ))}
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
