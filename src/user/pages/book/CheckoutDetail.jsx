import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "../../css/book/CheckoutDetail.module.css";
import CheckoutModal from "../../components/book/CheckoutModal";

const BookDetail = ({ book }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container>
      <div className={styles.bookdetail_wrap}>
        <img className={styles.bookImg} src="../imgs/default.png" />
        <div className={styles.content_wrap}>
          <h2>책으로 가는 문 - 이와나미소년문고를 이야기하다</h2>

          <div className={styles.name}>
            <span>미야자키 하야오 저</span> | <span>다우출판사 </span>
            <span className={styles.publish_date}>| 2023.10.13</span>
          </div>

          <div className={styles.date_wrap}>
            <span className={styles.date_word}>대여 기간</span>
            <span className={styles.date_content}>대여 일로부터 7일 후</span>
          </div>

          <div className={styles.count_wrap}>
            <span className={styles.count}>대여 가능 수량 :</span>&nbsp;
            <span>6</span>
          </div>

          <div className={styles.buttons}>
            <input
              className={styles.checkout_btn}
              type="button"
              value="대여하기"
              onClick={() => setModalShow(true)}
            />
            <CheckoutModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookDetail;
