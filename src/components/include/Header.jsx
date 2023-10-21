import React, { useState } from "react";
// import "./css/Header.css";
import styles from "./css/Header.module.css";
import LoginModal from "./LoginModal";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    // <Container className="main_header">
    //   <div className="search_bar">
    //     <a className="logo">
    //       <img src="../imgs/logo.png" />
    //     </a>
    //     <div className="search_bar_wrap">
    //       <input
    //         className="main_search_bar"
    //         type="text"
    //         placeholder="통합 검색"
    //       />
    //     </div>
    //   </div>
    //   <div id="user-actions">
    //     <p className="show_modal" onClick={() => setModalShow(true)}>
    //       Login
    //     </p>
    //     <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    //   </div>
    // </Container>
    <div className={styles.header}>
      <div className={styles.main_search}>
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.search_btn}
        />
      </div>
      <div className={styles.today}>
        <span className={styles.today_day}>Friday, </span>
        20 October 2023{" "}
      </div>
    </div>
  );
};

export default Header;
