import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { updateUserState } from "../../../redux/user/slices/userSlice";

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
    axios
      .get(`/admin/management/change_user_state`, {
        params: {
          no: props.u_no,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log("response.data : ", response.data);
        dispatch(updateUserState(props.u_no));
        if (result == 1) {
          alert("상태가 변경되었습니다.");
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
      <td>{user.u_state}</td>
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
