import React, { useState } from "react";
import stylesAdmin from "../../css/book/AdminBookListNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AdminCommunityListNav = ({ onNavStateChange, onSearchBookChange }) => {
  const [keyword, setKeyword] = useState("");
  const [selectedNav, setSelectedNav] = useState("RECOMMEND");

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
    onNavStateChange(nav);
  };

  console.log("selectedNav :: ", selectedNav);

  return (
    <div>
      <div className={stylesAdmin.search_book}>
        <input
          type="text"
          placeholder="SEARCH COMMUNITY"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={stylesAdmin.search_book_btn}
          onClick={() => onSearchBookChange(keyword)}
        />
      </div>

      <ul className={stylesAdmin.booklist_nav}>
        <li
          onClick={() => handleNavClick("RECOMMEND")}
          className={
            selectedNav === "RECOMMEND" ? stylesAdmin.nav_selected : ""
          }
        >
          RECOMMEND
        </li>
        <li
          onClick={() => handleNavClick("GATHER")}
          className={selectedNav === "GATHER" ? stylesAdmin.nav_selected : ""}
        >
          GATHER
        </li>
        <li
          onClick={() => handleNavClick("FREE")}
          className={selectedNav === "FREE" ? stylesAdmin.nav_selected : ""}
        >
          FREE
        </li>
      </ul>
    </div>
  );
};

export default AdminCommunityListNav;
