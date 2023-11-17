import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BookListNav from "../../components/book/BookListNav";
import CheckoutListItem from "../../components/book/CheckoutListItem";
import axios from "axios";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../../../redux/book/slices/bookSlice";
import { Loading } from "../../components/common/Loading";
import { chkBookActions } from "../../../redux/book/slices/chkBookSlice";
import { useLocation } from "react-router";
import { commonActions } from "../../../redux/common/slices/commonSlice";
import {
  checkoutBooksHome,
  chkedBookList,
} from "../../components/common/login/APIUtils";

const CheckoutList = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const { bookMenu } = useSelector((state) => state.common);
  const [navState, setNavState] = useState(bookMenu);

  const { bookDto, searchBookDto } = useSelector((state) => state.book);
  const [searchBook, setSearchBook] = useState(
    searchBookDto.keyword === undefined ? "" : searchBookDto.keyword
  );

  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = books.slice(startIndex, endIndex);

  const dispatch = useDispatch();
  console.log("searchBookDto.keyword :: ", searchBookDto.keyword);

  useEffect(() => {
    dispatch(commonActions.setMainMenu(3));
    // dispatch(commonActions.setBookMenu("all"));
    console.log("bookMenu", bookMenu);
  }, []);

  useEffect(() => {
    let arr = [];
    chkedBookList({
      params: {
        id: null,
        u_email: null,
      },
    })
      .then((response) => {
        const chkBookDtos = response.data;
        dispatch(chkBookActions.fetchChkBookDto(chkBookDtos));
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    checkoutBooksHome({
      params: {
        category: bookMenu,
        keyword: searchBook,
      },
    })
      .then((response) => {
        const bookDtos = response.data;
        dispatch(bookActions.fetchBookDto(bookDtos));
        arr = Array.from(response.data.dtos);
        // setSearchBook(searchBookDto.keyword);
        setLoading(false);
        setBooks(arr);
      })
      .catch((error) => console.log(error));
  }, [bookMenu, searchBook]);

  useEffect(() => {
    setBooks(bookDto);
  }, [bookDto]);

  return (
    <Container>
      <BookListNav
        bookMenu={bookMenu}
        onNavStateChange={setNavState}
        onSearchBookChange={setSearchBook}
      />
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "800px",
          }}
        >
          <Loading />
        </div>
      ) : (
        <Row>
          {books.length == 0 ? (
            <Row
              style={{
                color: "#fd8a69",
                fontSize: "1.2em",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              "{searchBook}" 에 대한 검색 결과가 없습니다.
            </Row>
          ) : (
            <Row>
              {displayedBooks.map((book) => (
                <CheckoutListItem
                  page={page}
                  navState={navState}
                  searchBook={searchBook}
                  book={book}
                  idx={book.b_no}
                />
              ))}
            </Row>
          )}
          <PaginationControl
            page={page}
            between={4}
            total={books.length}
            limit={itemsPerPage}
            changePage={(page) => {
              setPage(page);
            }}
            ellipsis={1}
          />
        </Row>
      )}
    </Container>
  );
};

export default CheckoutList;
