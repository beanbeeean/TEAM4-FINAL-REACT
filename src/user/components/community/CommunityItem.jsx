import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommunityItem = ({ community, userDtos }) => {
  const date = new Date(community.c_reg_date);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const { userDtos } = useSelector((state) => state.user);

  return (
    <tr>
      <td className="text-center">
        {community.c_category == 1
          ? "자유 게시판"
          : community.c_category == 2
          ? "도서추천"
          : "스터디원 모집"}
      </td>
      <Link to={`/community/${community.c_no}`}>
        <td>{community.c_title}</td>
      </Link>
      <td className="text-center">{community.c_hit}</td>
      <td className="text-center">
        {userDtos.filter((e) => e.u_email == community.u_email)[0].u_name}
      </td>
      <td className="text-center">{`${yyyy}-${mm}-${dd}`}</td>
    </tr>
  );
};

export default CommunityItem;
