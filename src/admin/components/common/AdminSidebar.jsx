import React, { useState } from "react";
import stylesAdmin from "../../css/common/AdminSidebar.module.css";

const AdminSidebar = ({ menu, setMenu }) => {
  return (
    <div className={stylesAdmin.side_bar}>
      <img className={stylesAdmin.logo} src="../imgs/admin_logo.png" alt="" />
      {/* <div className={stylesAdmin.sub_title}>MANAGEMENT</div> */}
      <ul className={stylesAdmin.nav_menu}>
        <li
          onClick={() => setMenu(1)}
          className={`${menu == 1 && stylesAdmin.on}`}
        >
          ADMIN
        </li>
        <li
          onClick={() => setMenu(2)}
          className={`${menu == 2 && stylesAdmin.on}`}
        >
          USER
        </li>
        {/* <li
          onClick={() => movePage(2)}
          className={`${currentMenu == 2 && stylesAdmin.on}`}
        >
          ADMIN
        </li> */}
        <li
          onClick={() => setMenu(3)}
          className={`${menu == 3 && stylesAdmin.on}`}
        >
          RESERVATION
        </li>
        <li
          onClick={() => setMenu(4)}
          className={`${menu == 4 && stylesAdmin.on}`}
        >
          BOOK
        </li>
        <li
          onClick={() => setMenu(5)}
          className={`${menu == 5 && stylesAdmin.on}`}
        >
          COMMUNITY
        </li>
        <li
          onClick={() => setMenu(6)}
          className={`${menu == 6 && stylesAdmin.on}`}
        >
          MY PAGE
        </li>
      </ul>
      <div className={stylesAdmin.logout}>LogOut</div>
    </div>
  );
};

export default AdminSidebar;
