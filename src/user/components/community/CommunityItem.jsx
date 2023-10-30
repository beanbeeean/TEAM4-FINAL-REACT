import React from "react";
import { Link } from "react-router-dom";

const CommunityItem = ({ community }) => {
  const date = new Date(community.c_reg_date);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return (
    <tr>
      <td className="text-center">
        {community.c_no == 1
          ? "FREE"
          : community.c_no == 2
          ? "RECOMMEND"
          : "GATHER"}
      </td>
      <Link to={`/community/${community.c_no}`}>
        <td>{community.c_title}</td>
      </Link>
      <td className="text-center">{community.u_no}</td>
      <td className="text-center">{`${yyyy}-${mm}-${dd}`}</td>
    </tr>
  );
};

export default CommunityItem;
