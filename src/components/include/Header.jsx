import React, { useState } from "react";
import "./css/Header.css";
import { Container } from "react-bootstrap";
import LoginModal from "./LoginModal";

const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Container className="main_header">
      <div className="search_bar">
        <a className="logo">
          <img src="./imgs/logo.png" />
        </a>
        <div className="search_bar_wrap">
          <input
            className="main_search_bar"
            type="text"
            placeholder="통합 검색"
          />
        </div>
      </div>
      <div id="user-actions">
        <p className="show_modal" onClick={() => setModalShow(true)}>
          Login
        </p>
        <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </Container>
  );
};

export default Header;
