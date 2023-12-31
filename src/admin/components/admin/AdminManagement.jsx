import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/usermanagement/UserManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchUserDto,
  fetchUserDtos,
  userAction,
} from "../../../redux/user/slices/userSlice";
import { PaginationControl } from "react-bootstrap-pagination-control";
import AdminAdminListItem from "./AdminAdminListItem";
import {
  adminManagement,
  userManagement,
} from "../../../user/components/common/login/APIUtils";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [searchAdmin, setSearchAdmin] = useState("");
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAdmins = admins.slice(startIndex, endIndex);

  const dispatch = useDispatch();
  const { userDtos } = useSelector((state) => state.user);

  useEffect(() => {
    userManagement({
      params: {
        keyword: searchAdmin,
      },
    })
      .then((response) => {
        const dtos = response.data.dtos;
        dispatch(fetchUserDtos(dtos));
        setAdmins(dtos.filter((e) => e.u_role !== "ROLE_USER"));
      })
      .catch((error) => console.log(error));
  }, [searchAdmin]);

  useEffect(() => {
    let arr = userDtos.filter((e) => e.u_role !== "ROLE_USER");
    setAdmins(arr);
  }, [userDtos]);

  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>ADMIN MANAGEMENT</h2>
      <div className={stylesAdmin.search_user}>
        <input
          type="text"
          placeholder="관리자 검색"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={stylesAdmin.search_user_btn}
          onClick={() => setSearchAdmin(keyword)}
        />
      </div>
      <div className={stylesAdmin.user_list}>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>이메일</th>
              <th>등록일</th>
              <th>권한</th>
              <th>승인여부</th>
              <th>상태변경</th>
            </tr>
          </thead>
          <tbody>
            {displayedAdmins.map((admin) => (
              <tr className={stylesAdmin.user_item}>
                <AdminAdminListItem admin={admin} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControl
        page={page}
        between={4}
        total={admins.length}
        limit={itemsPerPage}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};

export default AdminManagement;
