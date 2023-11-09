import React, { useState } from "react";
// import "./css/Header.css";
import styles from "../../css/common/Header.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../redux/book/slices/bookSlice";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  console.log("keyword :: ", keyword);

  const todayDate = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    return todayYear + ". " + todayMonth + ". " + todayDate;
  };

  const todayDay = () => {
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = week[new Date().getDay()];
    return day;
  };

  return (
    <div className={styles.header}>
      <div className={styles.main_search}>
        <input
          type="text"
          placeholder="통합 검색"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Link to={`/search/${keyword}`}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.search_btn}
            // onClick={() => onSearch(keyword)}
          />
        </Link>
      </div>
      <div className={styles.today}>
        <span className={styles.today_day}> {todayDay()}, </span>
        {todayDate()}
      </div>
    </div>
  );
};

export default Header;
