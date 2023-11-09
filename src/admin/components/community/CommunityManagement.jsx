import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/community/CommunityManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import axios from "axios";
import AdminCommunityListNav from "./AdminCommunityListNav";
import { Link } from "react-router-dom";

const CommunityManagement = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [communities, setCommunities] = useState([]);
  const [navState, setNavState] = useState("RECOMMEND");
  const [searchCommunity, setSearchCommunity] = useState("");

  const dispatch = useDispatch();
  const { communityDto } = useSelector((state) => state.community);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedLists = communities.slice(startIndex, endIndex);

  const changeState = (props) => {
    axios
      .get(`/admin/management/change_community_state`, {
        params: {
          no: props.c_no,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log("response.data : ", response.data);
        dispatch(communityActions.updateState(props.c_no));
        if (result == 1) {
          alert("상태가 변경되었습니다.");
          // props.onHide(true);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let arr = [];
    axios
      .get(`/admin/management/communityManagement`, {
        params: {
          category: navState,
          keyword: searchCommunity,
        },
      })
      .then((response) => {
        const communityDtos = response.data.dtos;
        dispatch(communityActions.fetchCommunityDto(communityDtos));
        arr = Array.from(response.data.dtos);
        setCommunities(arr);
      })
      .catch((error) => console.log(error));
  }, [navState, searchCommunity]);

  useEffect(() => {
    setCommunities(communityDto);
  }, [communityDto]);

  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>COMMUNITY MANAGEMENT</h2>
      <AdminCommunityListNav
        onNavStateChange={setNavState}
        onSearchBookChange={setSearchCommunity}
      />
      <div>
        <div className={stylesAdmin.book_list}>
          <table className={stylesAdmin.book_wrap}>
            <thead>
              <tr>
                <th className="text-center">유형</th>
                <th className="text-center">제목</th>
                <th className="text-center">작성자(이메일)</th>
                <th className="text-center">작성일</th>
                <th className="text-center">상태</th>
                <th className="text-center">변경</th>
              </tr>
            </thead>
            <tbody>
              {communities.length == 0 ? (
                <td
                  rowSpan="5"
                  colSpan="6"
                  style={{
                    fontSize: "1.2em",
                  }}
                >
                  "{searchCommunity}" 에 대한 검색 결과가 없습니다.
                </td>
              ) : (
                <>
                  {displayedLists.map((community) => (
                    <tr>
                      <td className="text-center">
                        {community.c_category == 1
                          ? "자유 게시판"
                          : community.c_category == 2
                          ? "도서 추천"
                          : "스터디원 모집"}
                      </td>
                      <td>{community.c_title}</td>
                      <td>{community.u_email}</td>
                      <td>{community.c_reg_date.replace("T", " ")}</td>
                      <td>{community.c_state == 1 ? "표시" : "숨김"}</td>
                      <td>
                        <input
                          type="button"
                          value="변경"
                          onClick={changeState.bind(this, community)}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
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
    </div>
  );
};

export default CommunityManagement;
