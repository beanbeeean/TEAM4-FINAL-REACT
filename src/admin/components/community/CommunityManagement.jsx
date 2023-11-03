import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/community/CommunityManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import axios from "axios";
import AdminCommunityListNav from "./AdminCommunityListNav";
import { Link } from "react-router-dom";

const CommunityManagement = () => {
  const [on, setOn] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [communities, setCommunities] = useState([]);
  const [navState, setNavState] = useState("RECOMMEND");
  const [searchCommunity, setSearchCommunity] = useState("");

  console.log("navState :: ", navState);
  console.log("searchCommunity :: ", searchCommunity);

  const dispatch = useDispatch();
  const { communityDto } = useSelector((state) => state.community);
  console.log("communityDto : ", communityDto);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedLists = communities.slice(startIndex, endIndex);

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
                <th className="text-center">TYPE</th>
                <th className="text-center">TITLE</th>
                <th className="text-center">USER</th>
                <th className="text-center">DATE</th>
                <th className="text-center">STATE</th>
                <th className="text-center">BTN</th>
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
                          ? "FREE"
                          : community.c_category == 2
                          ? "RECOMMEND"
                          : "GATHER"}
                      </td>
                      <td>{community.c_title}</td>
                      <td>{community.u_email}</td>
                      <td>{community.c_reg_date}</td>
                      <td>{community.c_state}</td>
                      <td>
                        <input type="button" value="변경" />
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
        limit={10}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};

export default CommunityManagement;
