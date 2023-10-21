import React from "react";
import "./css/Nav.css";
import { Container } from "react-bootstrap";

const Nav = () => {
  return (
    <Container className="nav_wrap">
      <div>
        <a className="books" href="#">
          <p className="books">도서</p>
        </a>

        <a className="community" href="#">
          <p className="community">커뮤니티</p>
        </a>

        <a className="room_reserve" href="#">
          <p class="room_reserve">좌석 현황/발권</p>
        </a>

        <a className="menu" href="#">
          <p class="menu">menu</p>
        </a>
      </div>
    </Container>
  );
};

export default Nav;
