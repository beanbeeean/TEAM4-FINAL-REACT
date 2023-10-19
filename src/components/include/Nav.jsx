import React from "react";
import "./css/Nav.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Container className="nav_wrap">
      <div>
        <Link to="/books" className="books">
          <p className="books">도서</p>
        </Link>

        <Link to="/cart" className="community">
          <p className="community">커뮤니티</p>
        </Link>

        <a className="room_reserve" href="#">
          <p className="room_reserve">좌석 현황/발권</p>
        </a>

        <a className="menu" href="#">
          <p className="menu">menu</p>
        </a>
      </div>
    </Container>
  );
};

export default Nav;
