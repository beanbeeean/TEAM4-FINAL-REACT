import React, { useEffect, useState } from "react";
import { faMagnifyingGlass, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "../../css/community/Board.module.css";
import CommunityItem from "../../components/community/CommunityItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { commonActions } from "../../../redux/common/slices/commonSlice";
import { Loading } from "../../components/common/Loading";
import Swal from "sweetalert2";
import { userCommunity } from "../../components/common/login/APIUtils";

const Community = () => {
  const { communityDto, searchCommunityDto, loading } = useSelector(
    (state) => state.community
  );

  console.log("communityDto :: ", communityDto);
  const dispatch = useDispatch();
  const { communityMenu } = useSelector((state) => state.common);
  const [searchOption, setSearchOption] = useState(1);
  const [keyword, setKeyword] = useState(
    searchCommunityDto.keyword === undefined ? "" : searchCommunityDto.keyword
  );

  const [communities, setCommunities] = useState([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // let arr = communityDto.communityDtos.filter(
  //   (e) => e.c_category === communityMenu
  // );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const displayedCommunities = arr.slice(startIndex, endIndex);
  const displayedCommunities = communities.slice(startIndex, endIndex);
  //
  const user = useSelector((state) => state.user.flag);

  const loginChk = () => {
    if(!user){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "로그인이 필요합니다.",
        iconColor: "rgb(33, 41, 66)",
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  const getCommunity = () => {
    // axios.get(`/community`, {
    //   params: {
    //     keyword: keyword,
    //     category: communityMenu,
    //     searchOption: searchOption,
    //   },
    // });
    userCommunity({
      params: {
        keyword: keyword,
        category: communityMenu,
        searchOption: searchOption,
      },
    })
      .then((response) => {
        const community = response.data;
        dispatch(communityActions.fetchCommunityDto(community));
        console.log("commu res :: ", response.data);
        setCommunities(response.data.communityDtos);
        dispatch(commonActions.setMainMenu(4));
        dispatch(communityActions.setLoading(false));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    dispatch(communityActions.setLoading(true));
    getCommunity();
    dispatch(commonActions.setMainMenu(4));
    // dispatch(commonActions.setCommunityMenu(1));
  }, []);

  useEffect(() => {
    dispatch(communityActions.setLoading(true));
    getCommunity();
    // getCommunity(keyword, on, searchOption);
    console.log("바뀜");
    console.log("communityMenu : ", communityMenu);
  }, [communityMenu]);

  if (loading) {
    return (
      <div className={styles.loading_community_area}>
        <Loading />
      </div>
    );
  }

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
          { user ?
          <Link to="/community_write">
            <FontAwesomeIcon className={styles.write_icon} icon={faPen} />
            &nbsp;&nbsp;글쓰기
          </Link> : <p onClick={()=>loginChk()}><FontAwesomeIcon className={styles.write_icon} icon={faPen}/>
            &nbsp;&nbsp;글쓰기</p>
          }
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
            {communities.length == 0 ? (
              <td colSpan="5" style={{ textAlign: "center" }}>
                게시물이 없습니다.
              </td>
            ) : (
              <>
                {displayedCommunities.map((community) => (
                  <CommunityItem community={community} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <PaginationControl
        page={page}
        between={4}
        total={communities.length}
        limit={itemsPerPage}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </>
  );
};

export default Community;
