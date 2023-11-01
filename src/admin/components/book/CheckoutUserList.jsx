import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/book/CoutUserModal.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";

const CheckoutUserList = ({ user }) => {
  const [state, setState] = useState();
  // console.log("user : ", user.user);
  const dispatch = useDispatch();
  const { chkBookDto } = useSelector((state) => state.chkBook);

  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  const changeState = () => {
    if (window.confirm("반납하시겠습니까?")) {
      axios
        .get(`/admin/management/return_book${user.chk_b_no}`)
        .then((response) => {
          console.log("response.data : ", response.data);
          const result = response.data;
          const chk_b_no = user.chk_b_no;
          dispatch(chkBookActions.updateReturnState(chk_b_no));
          if (result == 1) {
            alert("반납 처리 되었습니다.");
            // props.onHide(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <tr className={stylesAdmin.user_item}>
      <td>{user.u_email}</td>
      <td>
        {dateFormat(user.chk_b_start_date)} ~{dateFormat(user.chk_b_end_date)}
      </td>
      <td>{user.chk_b_state == 0 ? "반납완료" : "대여중"} </td>
      <td>
        <input type="button" value="반납" onClick={changeState} />
      </td>
    </tr>
  );
};

export default CheckoutUserList;
