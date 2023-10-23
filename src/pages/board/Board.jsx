import React, { useState } from "react";
import { faMagnifyingGlass, faPen } from "@fortawesome/free-solid-svg-icons";
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
        <button className={styles.write_btn}>
          <Link to="/board_write">
            <FontAwesomeIcon className={styles.write_icon} icon={faPen} />
            &nbsp;&nbsp;WRITE
          </Link>
        </button>
      </div>

      <div className={styles.board_content}>
        <div className={styles.search_box}>
          <select name="search_category">
            <option value="all">ALL</option>
            <option value="title">TITLE</option>
            <option value="user">USER</option>
          </select>
          <div className={styles.search_bar}>
            <input type="text" placeholder="Search" />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles.search_btn}
            />
          </div>
        </div>
        <table className={styles.board_table}>
          <thead>
            <tr>
              <th className="text-center">TYPE</th>
              <th className="text-center">TITLE</th>
              <th className="text-center">USER</th>
              <th className="text-center">DATE</th>
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
      </div>
    </>
  );
};

export default Board;
