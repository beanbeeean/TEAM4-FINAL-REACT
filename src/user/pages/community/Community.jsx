import React, { useEffect, useState } from "react";
import { faMagnifyingGlass, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "../../css/community/Board.module.css";
import CommunityItem from "../../components/community/CommunityItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { commonActions } from "../../../redux/common/slices/commonSlice";

const Community = () => {
  const { communityDto, searchCommunityDto } = useSelector(
    (state) => state.community
  );
  const [category, setCategory] = useState(
    searchCommunityDto.category === undefined ? 1 : searchCommunityDto.category
  );

  const { communityMenu } = useSelector((state) => state.common);
  const [searchOption, setSearchOption] = useState(1);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState(
    searchCommunityDto.keyword === undefined ? "" : searchCommunityDto.keyword
  );

  console.log("searchCommunityDto.keyword : ", searchCommunityDto.keyword);
  console.log("searchCommunityDto.category : ", searchCommunityDto.category);

  const getCommunity = () => {
    axios
      .get(`/community`, {
        params: {
          keyword: keyword,
          category: communityMenu,
          searchOption: searchOption,
        },
      })
      .then((response) => {
        // setCommunity(response.data.communityDtos);
        const communityDtos = response.data;
        dispatch(communityActions.fetchCommunityDto(communityDtos));
        console.log("res", response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCommunity();
    dispatch(commonActions.setMainMenu(4));
    // dispatch(commonActions.setCommunityMenu(1));
  }, []);

  useEffect(() => {
    getCommunity();
    // getCommunity(keyword, on, searchOption);
    console.log("바뀜");
    console.log("communityMenu : ", communityMenu);
  }, [communityMenu]);

  return (
    <>
      <div className={styles.board_header}>
        <h3 className={styles.board_title}>Community</h3>
        <div className={styles.search_area}>
          <div className={styles.category_box}>
            <ul>
              <li
                className={`${styles.board_category} ${
                  communityMenu == 1 && styles.on
                }`}
                onClick={() => dispatch(commonActions.setCommunityMenu(1))}
              >
                자유 게시판
              </li>
              <li
                className={`${styles.board_category} ${
                  communityMenu == 2 && styles.on
                }`}
                onClick={() => dispatch(commonActions.setCommunityMenu(2))}
              >
                도서 추천
              </li>
              <li
                className={`${styles.board_category} ${
                  communityMenu == 3 && styles.on
                }`}
                onClick={() => dispatch(commonActions.setCommunityMenu(3))}
              >
                스터디원 모집
              </li>
            </ul>
          </div>
        </div>
        <button className={styles.write_btn}>
          <Link to="/community_write">
            <FontAwesomeIcon className={styles.write_icon} icon={faPen} />
            &nbsp;&nbsp;글쓰기
          </Link>
        </button>
      </div>

      <div className={styles.board_content}>
        <div className={styles.search_box}>
          <select
            name="search_category"
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="1">전체</option>
            <option value="2">제목</option>
            <option value="3">작성자</option>
          </select>
          <div className={styles.search_bar}>
            <input
              type="text"
              placeholder="검색"
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
              <th className="text-center">카테고리</th>
              <th className="text-center">제목</th>
              <th className="text-center">조회수</th>
              <th className="text-center">작성자</th>
              <th className="text-center">작성일</th>
            </tr>
          </thead>
          <tbody>
            {communityDto?.communityDtos?.map((community) => (
              <CommunityItem community={community} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Community;
