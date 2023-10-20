import React from "react";
import styles from "./css/RequestBookModal.module.css";
import { Button, Modal } from "react-bootstrap";

const RequestBookModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Request Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.notice}>
          신청하고자 하는 책의 정보를 정확히 입력해주세요
        </div>
        <div className={styles.content}>
          <span className={styles.book_title}>
            도서명&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <input type="text" placeholder="도서명을 입력하세요" />
        </div>
        <div className={styles.content}>
          <span className={styles.writer}>저자명&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input type="text" placeholder="저자명을 입력하세요" />
        </div>
        <div className={styles.content}>
          <span className={styles.publisher}>출판사명 </span>
          <input type="text" placeholder="출판사명을 입력하세요" />
        </div>
        <div className={styles.notice2}>
          책의 정보가 정확하지 않거나 부적절한 책일 경우, 승인이 거부될 수
          있습니다.
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.cout_btn}>신청하기</Button>
        <Button className={styles.cancle_btn} onClick={props.onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestBookModal;
