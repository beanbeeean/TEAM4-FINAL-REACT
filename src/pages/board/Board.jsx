import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./css/Board.css";

const Board = () => {
  const [on, setOn] = useState(1);

  return (
    <Container>
      <div className="mt-5 mb-5">
        <h3 className="text-center mb-4">게시판</h3>
        <div className="search_area pb-4">
          <div className="category_box">
            <ul>
              <li
                className={`board_category ${on == 1 && "on"}`}
                onClick={() => setOn(1)}
              >
                전체
              </li>
              <li
                className={`board_category ${on == 2 && "on"}`}
                onClick={() => setOn(2)}
              >
                도서추천
              </li>
              <li
                className={`board_category ${on == 3 && "on"}`}
                onClick={() => setOn(3)}
              >
                스터디원 모집
              </li>
              <li
                className={`board_category ${on == 4 && "on"}`}
                onClick={() => setOn(4)}
              >
                자유 게시판
              </li>
            </ul>
          </div>
          <div className="search_box">
            <select name="search_category" className="mx-3">
              <option value="all">전체</option>
              <option value="title">제목</option>
              <option value="user">작성자</option>
            </select>
            <div className="search_bar">
              <input type="text" />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search_btn"
              />
            </div>
          </div>
        </div>
        <button className="write_btn">
          <Link to="/board_write">글 작성</Link>
        </button>
        <table className="board_table">
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
      </div>
    </Container>
  );
};

export default Board;
