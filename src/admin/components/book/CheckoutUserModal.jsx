import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesAdmin from "../../css/book/CoutUserModal.module.css";
import CheckoutUserList from "./CheckoutUserList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";

const CheckoutUserModal = (props) => {
  const [users, setUsers] = useState([]);
  const [chkBooks, setChkBooks] = useState([]);

  const dispatch = useDispatch();
  const { chkBookDto } = useSelector((state) => state.chkBook);

  // useEffect(() => {
  //   let arr = [];
  //   arr = Array.from(chkBookDto);
  //   console.log("arr : ", arr);
  //   setUsers(arr);
  // }, [chkBookDto]);

  useEffect(() => {
    console.log("props.book", props.book);
    let arr = [];
    axios
      .get(`/admin/management/checkout_book_user_list${props.book.b_no}`)
      .then((response) => {
        // setUsers([]);
        const chkBookDtos = response.data;
        console.log("chkBookDtos: ", chkBookDtos);
        dispatch(chkBookActions.fetchChkBookDto(chkBookDtos.dtos));
        arr = Array.from(response.data.dtos);
        setUsers(arr);
      })
      .catch((error) => console.log(error));
  }, []);

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
              <th>U_EMAIL</th>
              <th>START/END DATE</th>
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
