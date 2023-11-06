import React from "react";
import { useSelector } from "react-redux";

const HomeCommunityItem = (props) => {
  const { userDto } = useSelector((state) => state.user);

  const user_name = userDto.filter((e) => e.u_email == props.community.u_email);

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
        {props.community.c_category == 1
          ? "FREE"
          : props.community.c_category == 2
          ? "RECOMMEND"
          : "GATHER"}
      </td>
      <td>{props.community.c_title}</td>
      <td className="text-center">{user_name[0].u_name}</td>
      <td className="text-center">{dateFormat(props.community.c_reg_date)}</td>
    </tr>
  );
};

export default HomeCommunityItem;
