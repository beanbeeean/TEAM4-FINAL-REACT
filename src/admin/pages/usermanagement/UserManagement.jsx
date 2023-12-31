import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/usermanagement/UserManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchUserDtos,
  updateUserState,
  userAction,
} from "../../../redux/user/slices/userSlice";
import AdminUserListItem from "../../components/user/AdminUserListItem";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { userManagement } from "../../../user/components/common/login/APIUtils";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [keyword, setKeyword] = useState("");

  console.log("users :: ", users);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  const dispatch = useDispatch();
  const { userDtos } = useSelector((state) => state.user);
  console.log("userDto :: ", userDtos);

  useEffect(() => {
    // axios
    //   .get(`/admin/management/memberManagement`, {
    //     params: {
    //       keyword: searchUser,
    //     },
    //   })
    userManagement({
      params: {
        keyword: searchUser,
      },
    })
      .then((response) => {
        const dtos = response.data.dtos;
        console.log("userDtos :: ", dtos);
        dispatch(fetchUserDtos(dtos));
        console.log(
          "userDto ===========:: ",
          dtos.filter((e) => e.u_role === "ROLE_USER")
        );
        setUsers(dtos.filter((e) => e.u_role === "ROLE_USER"));
      })
      .catch((error) => console.log(error));
  }, [searchUser]);

  useEffect(() => {
    let arr = userDtos.filter((e) => e.u_role === "ROLE_USER");
    setUsers(arr);
  }, [userDtos]);

  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>USER MANAGEMENT</h2>
      <div className={stylesAdmin.search_user}>
        <input
          type="text"
          placeholder="사용자 검색"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={stylesAdmin.search_user_btn}
          onClick={() => setSearchUser(keyword)}
        />
      </div>
      <div className={stylesAdmin.user_list}>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>간편 로그인</th>
              <th>이메일</th>
              <th>등록일</th>
              <th>계정 사용</th>
              <th>상태변경</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr className={stylesAdmin.user_item}>
                <AdminUserListItem user={user} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControl
        page={page}
        between={4}
        total={users.length}
        limit={itemsPerPage}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};

export default UserManagement;
