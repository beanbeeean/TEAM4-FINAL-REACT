import React from "react";

const AdminAdminListItem = ({ admin }) => {
  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <>
      <td>{admin.u_no}</td>
      <td>{admin.u_name}</td>
      <td>{admin.u_email}</td>
      <td>{dateFormat(admin.u_reg_date)}</td>
      <td>{admin.u_role}</td>
      <td>{admin.u_state}</td>
      <td>
        <input type="button" value="변경" />
      </td>
    </>
  );
};

export default AdminAdminListItem;
