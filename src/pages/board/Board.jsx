import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "./css/Board.module.css";

const Board = () => {
  const [on, setOn] = useState(1);

  return (
    <>
      <div className={styles.board_header}>
        <h3 className={styles.board_title}>Community</h3>
        <div className={styles.search_area}>
          <div className={styles.category_box}>
            <ul>
              <li
                className={`${styles.board_category} ${on == 1 && styles.on}`}
                onClick={() => setOn(1)}
              >
                ALL
              </li>
              <li
                className={`${styles.board_category} ${on == 2 && styles.on}`}
                onClick={() => setOn(2)}
              >
                RECOMMEND
              </li>
              <li
                className={`${styles.board_category} ${on == 3 && styles.on}`}
                onClick={() => setOn(3)}
              >
                GATHER
              </li>
              <li
                className={`${styles.board_category} ${on == 4 && styles.on}`}
                onClick={() => setOn(4)}
              >
                FREE BOARD
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.search_box}>
        <select name="search_category" className="mx-3">
          <option value="all">전체</option>
          <option value="title">제목</option>
          <option value="user">작성자</option>
        </select>
        <div className={styles.search_bar}>
          <input type="text" />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.search_btn}
          />
        </div>
      </div>
      <button className={styles.write_btn}>
        <Link to="/board_write">글 작성</Link>
      </button>
      <table className={styles.board_table}>
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
        </tbody>
      </table>
    </>
  );
};

export default Board;
