import React, { useState } from "react";
import styles from "../../css/common/SearchMain.module.css";
import { Link } from "react-router-dom";
import SearchCommunity from "../../components/common/SearchCommunity";
import HomeRecommendItem from "../../components/common/HomeRecommendItem";

const SearchMain = () => {
  const [on, setOn] = useState(1);

  return (
    <div>
      <div className={styles.first_wrap}>
        <div className={styles.mini_nav}>
          <span className={styles.title}>도서</span>
        </div>
        <div className={styles.search_books}>
          <div className={styles.book_wrap}>
            <img className={styles.book_img} src="../imgs/default.png" />
            <div className={styles.book_content_wrap}>
              <span className={styles.book_title}>달러구트의 꿈 백화점</span>
              <br />
              <span className={styles.author}>이시영 저 |</span>
              <span className={styles.publisher}> 홍재희 출판사</span>
            </div>
          </div>
          <div className={styles.book_wrap}>
            <img className={styles.book_img} src="../imgs/default.png" />
            <div className={styles.book_content_wrap}>
              <span className={styles.book_title}>달러구트의 꿈 백화점</span>
              <br />
              <span className={styles.author}>이시영 저 |</span>
              <span className={styles.publisher}> 홍재희 출판사</span>
            </div>
          </div>
          <div className={styles.book_wrap}>
            <img className={styles.book_img} src="../imgs/default.png" />
            <div className={styles.book_content_wrap}>
              <span className={styles.book_title}>달러구트의 꿈 백화점</span>
              <br />
              <span className={styles.author}>이시영 저 |</span>
              <span className={styles.publisher}> 홍재희 출판사</span>
            </div>
          </div>
          <div className={styles.book_wrap}>
            <img className={styles.book_img} src="../imgs/default.png" />
            <div className={styles.book_content_wrap}>
              <span className={styles.book_title}>달러구트의 꿈 백화점</span>
              <br />
              <span className={styles.author}>이시영 저 |</span>
              <span className={styles.publisher}> 홍재희 출판사</span>
            </div>
          </div>
          <div className={styles.book_wrap}>
            <img className={styles.book_img} src="../imgs/default.png" />
            <div className={styles.book_content_wrap}>
              <span className={styles.book_title}>달러구트의 꿈 백화점</span>
              <br />
              <span className={styles.author}>이시영 저 |</span>
              <span className={styles.publisher}> 홍재희 출판사</span>
            </div>
          </div>
          <Link to="/checkout_books">
            <span className={`${styles.block} ${styles.more}`}>+ more</span>
          </Link>
        </div>
        {/* <div className={styles.cannot_result}>
          검색 결과가 없습니다.
          <br />
          <Link to="/checkout_books">도서 페이지로 이동</Link>
        </div> */}
      </div>
      <div className={styles.second_wrap}>
        <div className={`${styles.community} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>커뮤니티</span>
            <Link to="/board">
              <li className={styles.more}>+ more</li>
            </Link>
          </div>
          <div className={styles.commu_wrap}>
            <table className={styles.commu_table}>
              <thead>
                <tr>
                  <th className="text-center">구분</th>
                  <th className="text-center">제목</th>
                  <th className="text-center">작성자</th>
                  <th className="text-center">작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
                <tr>
                  <td className="text-center">도서추천</td>
                  <td>이 책을 추천합니다.</td>
                  <td className="text-center">나요</td>
                  <td className="text-center">2023.10.19</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className={styles.cannot_result}>
            검색 결과가 없습니다.
            <br />
            <Link to="/board">커뮤니티 페이지로 이동</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchMain;
