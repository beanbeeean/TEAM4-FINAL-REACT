import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/book/CoutUserModal.module.css";
import axios from "axios";

const CheckoutUserList = (user) => {
  const [state, setState] = useState([]);
  console.log("user : ", user.user);

  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  const changeState = () => {
    alert("반납하시겠습니까?");
  };

  return (
    <tr className={stylesAdmin.user_item}>
      <td>{user.user.u_no}</td>
      <td>{dateFormat(user.user.chk_b_start_date)}</td>
      <td>{dateFormat(user.user.chk_b_end_date)}</td>
      <td>{state == 0 ? "대여중" : "대여가능"} </td>
      <td>
        <input type="button" value="반납" onClick={changeState} />
      </td>
    </tr>
  );
};

export default CheckoutUserList;
