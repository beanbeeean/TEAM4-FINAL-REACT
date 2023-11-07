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

  const [books, setBooks] = useState([]);

  // const onSearch = () => {
  //   // navigate(`/search&keyword=${keyword}`);

  //   axios
  //     .get(`/checkout_books/home`, {
  //       params: {
  //         category: "",
  //         keyword: keyword,
  //       },
  //     })
  //     .then((response) => {
  //       const bookDtos = response.data;
  //       dispatch(bookActions.fetchBookDto(bookDtos));
  //       console.log("bookDtos", response.data.dtos);
  //       setBooks(response.data.dtos);
  //     })
  //     .catch((error) => console.log(error));

  //   axios
  //     .get(`/community`, {
  //       params: {
  //         keyword: keyword,
  //         category: "",
  //         searchOption: "",
  //       },
  //     })
  //     .then((response) => {
  //       // setCommunity(response.data.communityDtos);
  //       const communityDtos = response.data;
  //       dispatch(communityActions.fetchCommunityDto(communityDtos));
  //       console.log("community", response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

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
        <input
          type="text"
          placeholder="Search"
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
        <span className={styles.today_day}>Friday, </span>
        20 October 2023{" "}
      </div>
    </div>
  );
};

export default Header;
