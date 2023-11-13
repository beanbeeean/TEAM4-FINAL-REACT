import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/book/CoutUserModal.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const CheckoutUserList = ({ user }) => {
  const [state, setState] = useState(false);
  const [changeUser, setChangeuser] = useState(user);
  const dispatch = useDispatch();

  const { chkBookDto } = useSelector((state) => state.chkBook);
  const isChkBook = chkBookDto.filter((e) => e.chk_b_no === user.chk_b_no);
  console.log("isChkBook : ", chkBookDto);

  useEffect(() => {
    setChangeuser(isChkBook);
  }, [state]);

  const changeState = () => {
    Swal.fire({
      title: "반납하시겠습니까?",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "rgb(33, 41, 66)",
      cancelButtonColor: "#dadada",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
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
              Swal.fire({
                position: "center",
                icon: "success",
                title: "반납 처리 되었습니다.",
                iconColor: "rgb(33, 41, 66)",
                showConfirmButton: false,
                timer: 3000,
              });
              setState(!state);
              // setChangeuser(isChkBook);
            }
          })
          .catch((error) => console.log(error));
      }
    });
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
