import React, { useState } from "react";
import styles from "./css/Sidebar.module.css";
import { useNavigate } from "react-router";
const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState(1);
  const navigate = useNavigate();

  const movePage = (num) => {
    setCurrentMenu(num);
    switch (num) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/readroom");
        break;
      case 3:
        navigate("/books");
        break;
      case 4:
        navigate("/board");
        break;
    }
  };
  return (
    <div className={styles.side_bar}>
      <img className={styles.logo} src="../imgs/logo.png" alt="" />
      <ul className={styles.nav_menu}>
        <li
          onClick={() => movePage(1)}
          className={`${currentMenu == 1 && styles.on}`}
        >
          HOME
        </li>
        <li
          onClick={() => movePage(2)}
          className={`${currentMenu == 2 && styles.on}`}
        >
          RESERVATION
        </li>
        <li
          onClick={() => movePage(3)}
          className={`${currentMenu == 3 && styles.on}`}
        >
          BOOK
        </li>
        <li
          onClick={() => movePage(4)}
          className={`${currentMenu == 4 && styles.on}`}
        >
          COMMUNITY
        </li>
      </ul>
      <div className={styles.logout}>LogOut</div>
    </div>
  );
};

export default Sidebar;