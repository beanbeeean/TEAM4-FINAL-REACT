import React, { useState } from "react";
import stylesAdmin from "../../css/book/AdminBookListNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminBookListNav = ({ onNavStateChange, onSearchBookChange }) => {
  const [keyword, setKeyword] = useState("");
  const [selectedNav, setSelectedNav] = useState("all");

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
    onNavStateChange(nav);
  };

  return (
    <div>
      <input
        className={stylesAdmin.book_search}
        type="text"
        placeholder="도서 검색"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={stylesAdmin.book_search_btn}
        onClick={() => onSearchBookChange(keyword)}
      />

      <ul className={stylesAdmin.booklist_nav}>
        <li
          onClick={() => handleNavClick("all")}
          className={selectedNav === "all" ? stylesAdmin.nav_selected : ""}
        >
          종합
        </li>
        <li
          onClick={() => handleNavClick("new")}
          className={selectedNav === "new" ? stylesAdmin.nav_selected : ""}
        >
          신간
        </li>
        <li
          onClick={() => handleNavClick("bestseller")}
          className={
            selectedNav === "bestseller" ? stylesAdmin.nav_selected : ""
          }
        >
          베스트셀러
        </li>
      </ul>
    </div>
  );
};

export default AdminBookListNav;
