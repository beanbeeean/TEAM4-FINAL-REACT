import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "../../css/book/CheckoutDetail.module.css";
import CheckoutModal from "../../components/book/CheckoutModal";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const id = useParams().id;

  const store = useSelector((state) => state);
  const detailBook = store.book.bookDto.filter((e) => e.b_no === id * 1);

  // const [book, setBook] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(`/checkout_books/${id}`)
  //     .then((response) => {
  //       setBook(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, [id]);

  return (
    <Container>
      <Row>
        {detailBook[0] !== undefined && (
          <div className={styles.bookdetail_wrap}>
            <div>
              <img className={styles.bookImg} src={detailBook[0].b_cover} />
              <div className={styles.copyright}>
                도서 DB 제공 : 알라딘 인터넷서점(www.aladin.co.kr)
              </div>
              {/* <div className={styles.more_detail}>도서 자세히보기</div> */}
            </div>
            <div className={styles.content_wrap}>
              <h2>{detailBook[0].b_title}</h2>
              <div className={styles.name}>
                <span>{detailBook[0].b_author}</span> |{" "}
                <span>{detailBook[0].b_publisher}&nbsp;</span>
                <span className={styles.publish_date}>
                  | {detailBook[0].b_publish_date}
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
                  <span>{detailBook[0].b_stock}</span>
                </div>

                <div className={styles.buttons}>
                  {detailBook[0].b_stock > 0 ? (
                    <input
                      className={styles.checkout_btn}
                      type="button"
                      value="대여하기"
                      onClick={() => setModalShow(true)}
                    />
                  ) : (
                    <input
                      className={styles.checkoutDis_btn}
                      type="button"
                      value="대여하기"
                      disabled
                    />
                  )}
                  <CheckoutModal
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                    book={detailBook[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Row>
      {detailBook[0] !== null && (
        <Row>
          <div className={styles.description}>소개글</div>

          {detailBook[0].b_description == "" ? (
            <div>등록된 소개글이 없습니다. </div>
          ) : (
            <div>{detailBook[0].b_description}</div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default CheckoutDetail;
