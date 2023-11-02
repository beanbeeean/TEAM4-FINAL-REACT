import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MypageCommunityItem = ({ item }) => {
  console.log("item : ", item);

  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <tr>
      <td className="text-center">
        {item.c_category == 1
          ? "FREE"
          : item.c_category == 2
          ? "RECOMMEND"
          : "GATHER"}
      </td>
      <Link to={`/community/${item.c_no}`}>
        <td>{item.c_title}</td>
      </Link>
      <td className="text-center">{item.u_email}</td>
      <td className="text-center">{dateFormat(item.c_reg_date)}</td>
    </tr>
  );
};

export default MypageCommunityItem;
