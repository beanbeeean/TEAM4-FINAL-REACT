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
    axios
      .get(`/admin/management/memberManagement`, {
        params: {
          keyword: searchAdmin,
        },
      })
      .then((response) => {
        const dtos = response.data.dtos;
        dispatch(fetchUserDtos(dtos));
        setAdmins(dtos.filter((e) => e.u_role === "ROLE_ADMIN"));
      })
      .catch((error) => console.log(error));
  }, [searchAdmin]);

  useEffect(() => {
    let arr = userDtos.filter((e) => e.u_role === "ROLE_ADMIN");
    setAdmins(arr);
  }, [userDtos]);

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
              <th>ROLE</th>
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
