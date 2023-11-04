import React from "react";

const AdminUserListItem = ({ user }) => {
  console.log("user :: ", user);

  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
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
        <input type="button" value="변경" />
      </td>
    </>
  );
};

export default AdminUserListItem;
