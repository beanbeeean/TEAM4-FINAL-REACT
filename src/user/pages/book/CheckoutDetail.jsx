import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "../../css/book/CheckoutDetail.module.css";
import CheckoutModal from "../../components/book/CheckoutModal";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";

const CheckoutDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const [book, setBook] = useState(null);
  const id = useParams().id;

  console.log("id : ", id);

  useEffect(() => {
    axios
      .get(`/checkout_books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Container>
      <Row>
        {book !== null && (
          <div className={styles.bookdetail_wrap}>
            <div>
              <img className={styles.bookImg} src={book.b_cover} />
              <div className={styles.copyright}>
                도서 DB 제공 : 알라딘 인터넷서점(www.aladin.co.kr)
              </div>
              {/* <div className={styles.more_detail}>도서 자세히보기</div> */}
            </div>
            <div className={styles.content_wrap}>
              <h2>{book.b_title}</h2>
              <div className={styles.name}>
                <span>{book.b_author}</span> |{" "}
                <span>{book.b_publisher}&nbsp;</span>
                <span className={styles.publish_date}>
                  | {book.b_publish_date}
                </span>
              </div>

              <div className={styles.last_content}>
                <div className={styles.date_wrap}>
                  <span className={styles.date_word}>대여 기간</span>
                  <span className={styles.date_content}>
                    대여 일로부터 7일 후
                  </span>
                </div>

                <div className={styles.count_wrap}>
                  <span className={styles.count}>대여 가능 수량 :</span>&nbsp;
                  <span>{book.b_stock}</span>
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
                    book={book}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Row>
      {book !== null && (
        <Row>
          <div className={styles.description}>소개글</div>
          <div>{book.b_description}</div>
        </Row>
      )}
    </Container>
  );
};

export default CheckoutDetail;
