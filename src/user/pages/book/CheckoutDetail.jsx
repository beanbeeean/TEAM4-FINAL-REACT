import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "../../css/book/CheckoutDetail.module.css";
import CheckoutModal from "../../components/book/CheckoutModal";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import LoginModal from "../../components/common/LoginModal";
import { getChkBookDetail } from "../../components/common/login/APIUtils";

const CheckoutDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const id = useParams().id;

  const { bookDto } = useSelector((state) => state.book);

  console.log("bookDto :: ", bookDto);

  // const detailBook = bookDto.filter((e) => e.b_no === id * 1);
  const [detailBook, setDetailBook] = useState(null);
  // console.log("detailBook :: ", detailBook);

  const [unable, setUnable] = useState(true);
  const { userDto } = useSelector((state) => state.user);
  const { chkBookDto } = useSelector((state) => state.chkBook);

  const isChkBook = chkBookDto.filter((e) => e.u_email === userDto.u_email);
  console.log("isChkBook : ", isChkBook);

  const user = useSelector((state) => state.user.flag);

  const loginChk = () => {
    if (!user) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "로그인이 필요합니다.",
        iconColor: "rgb(33, 41, 66)",
        showConfirmButton: true,
        timer: 3000, // 메시지를 표시한 후 3초 동안 대기
      }).then((result) => {
        setLoginModalShow(true);
      });
    } else {
      setModalShow(true);
    }
  };

  useEffect(() => {
    getChkBookDetail(id)
      .then((response) => {
        setDetailBook(response.data);
      })
      .catch((err) => console.log("error"));
  }, []);

  useEffect(() => {
    if (detailBook != null) {
      isChkBook.map((item) => {
        if (item.b_no == detailBook.b_no && item.chk_b_state == 1) {
          setUnable(false);

          console.log("plz");
        }
      });
    }
  }, [isChkBook]);

  return (
    <Container>
      <Row>
        {detailBook !== null && (
          <div className={styles.bookdetail_wrap}>
            <div>
              <img className={styles.bookImg} src={detailBook.b_cover} />
              <div className={styles.copyright}>
                도서 DB 제공 : 알라딘 인터넷서점(www.aladin.co.kr)
              </div>
            </div>
            <div className={styles.content_wrap}>
              <h2>{detailBook.b_title}</h2>
              <div className={styles.name}>
                <span>{detailBook.b_author}</span> |{" "}
                <span>{detailBook.b_publisher}&nbsp;</span>
                <span className={styles.publish_date}>
                  | {detailBook.b_publish_date}
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
                  <span>{detailBook.b_stock}</span>
                </div>

                <div className={styles.buttons}>
                  {!unable ? (
                    <input
                      className={styles.checkoutDis_btn}
                      type="button"
                      value="대여중"
                      disabled
                    />
                  ) : detailBook.b_stock > 0 ? (
                    <input
                      className={styles.checkout_btn}
                      type="button"
                      value="대여하기"
                      onClick={() => loginChk()}
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
                    book={detailBook}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Row>
      {detailBook !== null && (
        <Row>
          <div className={styles.description}>소개글</div>

          {detailBook.b_description == "" ? (
            <div>등록된 소개글이 없습니다. </div>
          ) : (
            <div>{detailBook.b_description}</div>
          )}
        </Row>
      )}
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </Container>
  );
};

export default CheckoutDetail;
