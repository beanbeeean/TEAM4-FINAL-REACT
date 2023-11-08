import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUserState } from "../../../redux/user/slices/userSlice";

const AdminAdminListItem = ({ admin }) => {
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
      <td>{admin.u_no}</td>
      <td>{admin.u_name}</td>
      <td>{admin.u_email}</td>
      <td>{dateFormat(admin.u_reg_date)}</td>
      <td>{admin.u_role == "ROLE_SUPER" ? "최고 관리자" : "일반관리자"}</td>
      <td>{admin.u_state == 0 ? "승인대기" : "승인완료"}</td>
      <td>
        {admin.u_role != "ROLE_SUPER" ? (
          <input
            type="button"
            value="변경"
            onClick={changeState.bind(this, admin)}
          />
        ) : (
          "변경불가"
        )}
      </td>
    </>
  );
};

export default AdminAdminListItem;
