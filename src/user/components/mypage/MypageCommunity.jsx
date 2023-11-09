import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "../../css/mypage/MypageCommunity.module.css";
import { faMagnifyingGlass, faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import MypageCommunityItem from "./MypageCommunityItem";

const MypageCommunity = () => {
  const [on, setOn] = useState(1);
  const { userDto } = useSelector((state) => state.user);
  const { communityDto } = useSelector((state) => state.community);
  console.log("communityDto : ", communityDto);

  const dispatch = useDispatch();
  const isChkBook = communityDto.communityDtos.filter(
    (e) => e.u_email === userDto.u_email
  );
  console.log("isChkBook : ", isChkBook);

  return (
    <>
      <div className={styles.commu_header}>
        <button className={styles.write_btn}>
          <Link to="/board_write">
            <FontAwesomeIcon className={styles.write_icon} icon={faPen} />
            &nbsp;&nbsp;글쓰기
          </Link>
        </button>
      </div>
      <div className={styles.board_content}>
        <div className={styles.write_search_box}>
          <select name="search_category">
            <option value="all">전체</option>
            <option value="recommend">도서추천</option>
            <option value="gather">스터디원 모집</option>
            <option value="free_board">자유 게시판</option>
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
              <th className="text-center">유형</th>
              <th className="text-center">제목</th>
              <th className="text-center">작성자</th>
              <th className="text-center">작성일</th>
            </tr>
          </thead>
          <tbody>
            {isChkBook.map((item) => (
              <MypageCommunityItem item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MypageCommunity;
