import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import { Route, Routes } from "react-router-dom";
import UserManagement from "../usermanagement/UserManagement";
import ReservationManagement from "../../components/reservation/ReservationManagement";
import BookManagement from "../../components/book/BookManagement";
import CommunityManagement from "../../components/community/CommunityManagement";
import AdminManagement from "../../components/admin/AdminManagement";
import AdminMypageProfile from "../../components/mypage/AdminMypageProfile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDtos } from "../../../redux/user/slices/userSlice";

const Admin = () => {
  const [menu, setMenu] = useState(1);
  const dispatch = useDispatch();

  return (
    <div id="admin_wrap">
      <AdminSidebar menu={menu} setMenu={setMenu} />
      <div id="section">
        {menu == 1 && <AdminManagement />}
        {menu == 2 && <UserManagement />}
        {menu == 3 && <ReservationManagement />}
        {menu == 4 && <BookManagement />}
        {menu == 5 && <CommunityManagement />}
        {menu == 6 && <AdminMypageProfile />}
      </div>
    </div>
  );
};

export default Admin;
