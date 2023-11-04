import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/usermanagement/UserManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserDto, userAction } from "../../../redux/user/slices/userSlice";
import AdminUserListItem from "../../components/user/AdminUserListItem";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [keyword, setKeyword] = useState("");

  console.log("keyword :: ", keyword);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  const dispatch = useDispatch();
  const { userDto } = useSelector((state) => state.user);

  useEffect(() => {
    let arr = [];
    axios
      .get(`/admin/management/userManagement`, {
        params: {
          keyword: searchUser,
        },
      })
      .then((response) => {
        const userDtos = response.data;
        console.log("userDtos :: ", userDtos);
        dispatch(fetchUserDto(userDtos));
        arr = Array.from(userDtos.dtos);
        setUsers(arr);
      })
      .catch((error) => console.log(error));
  }, [searchUser]);

  console.log("users :: ", users);

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
          onClick={() => setSearchUser(keyword)}
        />
      </div>
      <div className={stylesAdmin.user_list}>
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>USER</th>
              <th>PROVIDER</th>
              <th>EMAIL</th>
              <th>JOIN DATE</th>
              <th>STATE</th>
              <th>CHANGE</th>
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
    </div>
  );
};

export default UserManagement;
