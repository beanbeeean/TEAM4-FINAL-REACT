import React from "react";
import stylesAdmin from "../../css/usermanagement/UserManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const UserManagement = () => {
  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>USER MANAGEMENT</h2>
      <div className={stylesAdmin.search_user}>
        <input type="text" placeholder="SEARCH USER" />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={stylesAdmin.search_user_btn}
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
              <th>CHECKOUT</th>
              <th>ACCOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr className={stylesAdmin.user_item}>
              <td>1</td>
              <td>JAEHEE</td>
              <td>NAVER</td>
              <td>beanbeeean@naver.com</td>
              <td>2023.10.25</td>
              <td>대여중</td>
              <td>O</td>
            </tr>
            <tr className={stylesAdmin.user_item}>
              <td>1</td>
              <td>JAEHEE</td>
              <td>NAVER</td>
              <td>beanbeeean@naver.com</td>
              <td>2023.10.25</td>
              <td>대여중</td>
              <td>O</td>
            </tr>
            <tr className={stylesAdmin.user_item}>
              <td>1</td>
              <td>JAEHEE</td>
              <td>NAVER</td>
              <td>beanbeeean@naver.com</td>
              <td>2023.10.25</td>
              <td>대여중</td>
              <td>O</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
