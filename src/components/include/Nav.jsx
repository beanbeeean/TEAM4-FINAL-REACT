import React from "react";
import "./css/Nav.css";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Container className="nav_wrap">
      <Col>
        <Link to="/books" className="books">
          <p className="books">도서</p>
        </Link>

        <Link to="/cart" className="community">
          <p className="community">커뮤니티</p>
        </Link>

        <Link to="/cart/confirm" className="room_reserve">
          <p className="room_reserve">좌석 현황/발권</p>
        </Link>

        <a className="menu" href="#">
          <p className="menu">menu</p>
        </a>
      </Col>
    </Container>
  );
};

export default Nav;
