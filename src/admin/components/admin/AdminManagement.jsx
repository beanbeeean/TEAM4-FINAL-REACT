import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/usermanagement/UserManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchAdminDto,
  fetchUserDto,
  userAction,
} from "../../../redux/user/slices/userSlice";
import AdminUserListItem from "../user/AdminUserListItem";
import { PaginationControl } from "react-bootstrap-pagination-control";
import AdminAdminListItem from "./AdminAdminListItem";

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
  const { userDto } = useSelector((state) => state.user);

  useEffect(() => {
    let arr = [];
    axios
      .get(`/admin/management/adminManagement`, {
        params: {
          keyword: searchAdmin,
        },
      })
      .then((response) => {
        const adminDtos = response.data;
        dispatch(fetchAdminDto(adminDtos));
        arr = Array.from(adminDtos.dtos);
        setAdmins(arr);
      })
      .catch((error) => console.log(error));
  }, [searchAdmin]);

  // useEffect(() => {
  //   setUsers(userDto);
  // }, [userDto]);

  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>USER MANAGEMENT</h2>
      <div className={stylesAdmin.search_user}>
        <input
          type="text"
          placeholder="SEARCH USER"
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
              <th>NO</th>
              <th>ADMIN</th>
              <th>EMAIL</th>
              <th>JOIN DATE</th>
              <th>STATE</th>
              <th>CHANGE</th>
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
        limit={20}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};

export default AdminManagement;
