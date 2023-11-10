import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../css/mypage/MypageCommunity.module.css";
import { faMagnifyingGlass, faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import MypageCommunityItem from "./MypageCommunityItem";
import axios from "axios";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { PaginationControl } from "react-bootstrap-pagination-control";

const MypageCommunity = () => {
  const [on, setOn] = useState(1);
  const { userDto } = useSelector((state) => state.user);
  const { communityDto, searchCommunityDto } = useSelector(
    (state) => state.community
  );
  console.log("communityDto : ", communityDto);

  const dispatch = useDispatch();
  const isCommunity = communityDto.communityDtos.filter(
    (e) => e.u_email === userDto.u_email
  );

  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCommunities = isCommunity.slice(startIndex, endIndex);

  console.log("displayedCommunities :: ", displayedCommunities);

  const getCommunity = () => {
    axios
      .get(`/community`, {
        params: {
          keyword: keyword,
          category: category,
          searchOption: "",
        },
      })
      .then((response) => {
        const community = response.data;
        dispatch(communityActions.fetchCommunityDto(community));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCommunity();
  }, [keyword, category]);

  return (
    <>
      <div className={styles.commu_header}>
        <button className={styles.write_btn}>
          <Link to="/community_write">
            <FontAwesomeIcon className={styles.write_icon} icon={faPen} />
            &nbsp;&nbsp;글쓰기
          </Link>
        </button>
      </div>
      <div className={styles.board_content}>
        <div className={styles.write_search_box}>
          <select
            name="search_category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="0">전체</option>
            <option value="2">도서추천</option>
            <option value="3">스터디원 모집</option>
            <option value="1">자유 게시판</option>
          </select>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={styles.search_btn}
              onClick={() => getCommunity()}
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
            {isCommunity.length == 0 ? (
              <td colSpan="4" style={{ textAlign: "center" }}>
                작성한 게시물이 없습니다.
              </td>
            ) : (
              <>
                {displayedCommunities.map((item) => (
                  <MypageCommunityItem item={item} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <PaginationControl
        page={page}
        between={4}
        total={isCommunity.length}
        limit={itemsPerPage}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </>
  );
};

export default MypageCommunity;
