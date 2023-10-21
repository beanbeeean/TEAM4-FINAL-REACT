import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./css/BookDetail.module.css";

const BookDetail = ({ book }) => {
  const [cnt, setCnt] = useState(1);

  const decreaseCnt = () => {
    console.log("decreaseCnt");
    if (cnt > 1) {
      setCnt(cnt - 1);
    }
  };

  const increaseCnt = () => {
    console.log("increaseCnt");
    setCnt(cnt + 1);
  };

  const onChange = (e) => {
    console.log("onChange");

    const newValue = parseInt(e.target.value);

    if (!isNaN(newValue) && newValue >= 1) {
      setCnt(newValue);
    }
  };

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

          <div>
            <span>정가</span>
            <span className={styles.ori_price}>16,000원</span>
          </div>

          <div>
            <span>판매가</span>
            <span className={styles.sale_price}>15,120원</span>
          </div>

          <div className={styles.count_wrap}>
            <span className={styles.count}>수량</span>
            <input type="button" value="-" onClick={decreaseCnt}></input>
            <input type="text" value={cnt} onChange={onChange}></input>
            <input type="button" value="+" onClick={increaseCnt}></input>
          </div>

          <div className={styles.buttons}>
            <input className={styles.cart} type="button" value="장바구니" />
            <input className={styles.buy} type="button" value="바로구매" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookDetail;
