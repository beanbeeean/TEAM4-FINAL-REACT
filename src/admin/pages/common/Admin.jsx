import React, { useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import { Route, Routes } from "react-router-dom";
import UserManagement from "../usermanagement/UserManagement";
import ReservationManagement from "../../components/reservation/ReservationManagement";
import BookManagement from "../../components/book/BookManagement";
import CommunityManagement from "../../components/community/CommunityManagement";

const Admin = () => {
  const [menu, setMenu] = useState(1);
  return (
    <div id="admin_wrap">
      <AdminSidebar menu={menu} setMenu={setMenu} />
      <div id="section">
        {menu == 1 && <UserManagement />}
        {menu == 2 && <ReservationManagement />}
        {menu == 3 && <BookManagement />}
        {menu == 4 && <CommunityManagement />}
      </div>
    </div>
  );
};

export default Admin;
