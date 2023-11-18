import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { updateUserState } from "../../../redux/user/slices/userSlice";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { adminList } from "../../../user/components/common/login/APIUtils";

const AdminUserListItem = ({ user }) => {
  const dispatch = useDispatch();

  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  const changeState = (props) => {
    // axios
    //   .get(`/admin/management/change_user_state`, {
    //     params: {
    //       no: props.u_no,
    //     },
    //   })
    adminList({
      params: {
        no: props.u_no,
      },
    })
      .then((response) => {
        const result = response.data;
        console.log("response.data : ", response.data);
        dispatch(updateUserState(props.u_no));
        if (result == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "상태가 변경되었습니다.",
            iconColor: "rgb(33, 41, 66)",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <td>{user.u_no}</td>
      <td>{user.u_name}</td>
      <td>{user.u_provider}</td>
      <td>{user.u_email}</td>
      <td>{dateFormat(user.u_reg_date)}</td>
      <td>{user.u_state == 1 ? "가능" : "불가"}</td>
      <td>
        <input
          type="button"
          value="변경"
          onClick={changeState.bind(this, user)}
        />
      </td>
    </>
  );
};

export default AdminUserListItem;
