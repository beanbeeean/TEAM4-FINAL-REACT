import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../../css/book/BookCoutModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";

const ReturnBookModal = (props) => {
  const [state, setState] = useState(false);
  const [change, setChange] = useState();
  const dispatch = useDispatch();

  const { bookDto } = useSelector((state) => state.book);

  const { chkBookDto } = useSelector((state) => state.chkBook);

  // useEffect(() => {
  //   console.log("state : ", state);
  // }, [state]);

  // useEffect(() => {
  //   dispatch(chkBookActions.fetchChkBookDto(chkBookDto));
  // }, []);

  const changeState = () => {
    if (window.confirm("반납하시겠습니까?")) {
      axios
        .get(`/admin/management/return_book`, {
          params: {
            b_no: props.book.b_no,
            chk_b_no: props.item.chk_b_no,
          },
        })
        .then((response) => {
          console.log("response.data : ", response.data);
          const result = response.data;
          const b_no = props.book.b_no;
          const chk_b_no = props.item.chk_b_no;
          dispatch(chkBookActions.updateReturnState({ b_no, chk_b_no }));
          if (result == 1) {
            alert("반납 처리 되었습니다.");
            setState(!state);
            props.onHide(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Return Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.img_wrap}>
          <img className={styles.book_img} src={props.book.b_cover} />
        </div>
        <div className={styles.content}>
          <span className={styles.book_title}>도서명: </span>
          {props.book.b_title}
        </div>
        <div className={styles.content}>
          <span className={styles.names}>저자명 / 출판사명 : </span>
          {props.item.b_author} 저 | {props.book.b_publisher}
        </div>
        <div className={styles.content}>
          <span className={styles.checkout_date}>대여기간: </span>
          {props.item.chk_b_start_date} ~ {props.item.chk_b_end_date} (7일간)
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.cout_btn} onClick={changeState}>
          반납하기
        </Button>
        <Button className={styles.cancle_btn} onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnBookModal;
