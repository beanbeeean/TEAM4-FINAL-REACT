import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import stylesAdmin from "../../css/book/ChangeStateModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { bookActions } from "../../../redux/book/slices/bookSlice";

const ChangeStateModal = (props) => {
  console.log("props : ", props);

  const dispatch = useDispatch();
  const [cnt, setCnt] = useState();
  const [bookState, setBookState] = useState();

  useEffect(() => {
    setCnt(props.book.b_stock);
    setBookState(props.book.b_state);
  }, [props.book.b_no]);

  const decreaseCnt = () => {
    if (cnt > 0) {
      setCnt(cnt - 1);
    }
  };

  const increaseCnt = () => {
    if (cnt < 5) {
      setCnt(cnt + 1);
    }
  };

  const onChange = (e) => {
    const newValue = parseInt(e.target.value);

    if (!isNaN(newValue) && newValue >= 1) {
      setCnt(newValue);
    }
  };

  const onBookStateChange = (e) => {
    setBookState(e.target.value);
  };

  const handleSave = () => {
    axios
      .get(`/admin/management/change_book_state`, {
        params: {
          no: props.book.b_no,
          stock: cnt,
          state: bookState,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log("response.data : ", response.data);
        const b_no = props.book.b_no;
        dispatch(bookActions.updateBookInfo({ b_no, cnt, bookState }));
        if (result == 1) {
          alert("수정되었습니다.");
          props.onHide(true);
        }
      })
      .catch((error) => console.log(error));
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
          {props.book.b_title} ({props.book.b_isbn})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={stylesAdmin.count}>
          <span>도서 수량</span>
          <input type="button" value="-" onClick={decreaseCnt}></input>
          <input type="text" value={cnt} onChange={(e) => onChange(e)}></input>
          <input type="button" value="+" onClick={increaseCnt}></input>
        </div>
        <div className={stylesAdmin.book_state}>
          <span>도서 상태</span>
          <select value={bookState} onChange={onBookStateChange}>
            <option value="1">사용가능</option>
            <option value="0">사용불가</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={stylesAdmin.cout_btn} onClick={handleSave}>
          변경하기
        </Button>
        <Button className={stylesAdmin.cancle_btn} onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeStateModal;
