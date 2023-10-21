import React from "react";
import "./css/Header.css";
import { Container } from "react-bootstrap";

const Header = () => {
  return (
    <Container className="main_header">
      <div className="search_bar">
        <a className="logo">Libooks</a>
        <div className="search_bar_wrap">
          <input
            className="main_search_bar"
            type="text"
            placeholder="통합 검색"
          />
        </div>
      </div>
      <div id="user-actions">
        <a href="#" className="show_modal">
          Login
        </a>
      </div>
    </Container>
  );
};

export default Header;
