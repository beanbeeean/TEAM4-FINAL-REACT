import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/book/CoutUserModal.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";

const CheckoutUserList = ({ user }) => {
  const [state, setState] = useState(false);
  const [changeUser, setChangeuser] = useState(user);
  const dispatch = useDispatch();

  const { chkBookDto } = useSelector((state) => state.chkBook);
  const isChkBook = chkBookDto.filter((e) => e.chk_b_no === user.chk_b_no);
  console.log("isChkBook : ", isChkBook);

  useEffect(() => {
    setChangeuser(isChkBook);
  }, [state]);

  const changeState = () => {
    if (window.confirm("반납하시겠습니까?")) {
      axios
        .get(`/admin/management/return_book`, {
          params: {
            b_no: user.b_no,
            chk_b_no: user.chk_b_no,
          },
        })
        .then((response) => {
          console.log("response.data : ", response.data);
          const result = response.data;
          const b_no = user.b_no;
          const chk_b_no = user.chk_b_no;
          dispatch(chkBookActions.updateReturnState({ b_no, chk_b_no }));
          if (result == 1) {
            alert("반납 처리 되었습니다.");
            setState(!state);
            // setChangeuser(isChkBook);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <tr className={stylesAdmin.user_item}>
      <td>{user.u_email}</td>
      <td>
        {user.chk_b_start_date} ~{user.chk_b_end_date}
      </td>
      <td>{isChkBook[0].chk_b_state == 0 ? "반납완료" : "대여중"} </td>
      <td>
        <input type="button" value="반납" onClick={changeState} />
      </td>
    </tr>
  );
};

export default CheckoutUserList;
