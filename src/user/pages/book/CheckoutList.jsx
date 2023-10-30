import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BookListNav from "../../components/book/BookListNav";
import CheckoutListItem from "../../components/book/CheckoutListItem";
import axios from "axios";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../../../redux/book/slices/bookSlice";
import { Loading } from "../../components/common/Loading";

const CheckoutList = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [navState, setNavState] = useState("all");
  const [searchBook, setSearchBook] = useState("");

  console.log("navstate: ", navState);
  console.log("searchBook: ", searchBook);

  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = books.slice(startIndex, endIndex);

  const dispatch = useDispatch();
  // let bookDtos;

  useEffect(() => {
    axios
      .get(`/checkout_books/home`, {
        params: {
          category: navState,
          keyword: searchBook,
        },
      })
      .then((response) => {
        setBooks(response.data.dtos);
        const bookDtos = response.data;
        dispatch(bookActions.fetchBookDto(bookDtos));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [navState, searchBook]);

  return (
    <Container>
      <BookListNav
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
              {displayedBooks.map((book) => {
                return <CheckoutListItem book={book} key={book.id} />;
              })}
            </Row>
          )}
        </Row>
      )}

      <PaginationControl
        page={page}
        between={4}
        total={books.length}
        limit={20}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </Container>
  );
};

export default CheckoutList;
