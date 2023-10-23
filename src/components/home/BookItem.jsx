import React from "react";
import styles from "./css/BookItem.module.css"

const BookItem = () => {
    return (
        <div className={styles.book_item}>
            <img src="../imgs/default.png" />
            <li className={styles.book_title}>오늘 내가 있잖아~</li>
            <li className={styles.name}>
                <span className={styles.book_writer}>홍재희 저</span>&nbsp;|&nbsp;
                <span className={styles.book_publisher}>시영컴퍼니</span>
            </li>
            <li>
                <span className={styles.sale_price}>15,250원</span>
                <span className={styles.ori_price}>18,600원</span>
            </li>
        </div>
    );
}

export default BookItem;