import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BookListNav from "../../components/book/BookListNav";
import CheckoutListItem from "../../components/book/CheckoutListItem";
import axios from "axios";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../../../redux/book/slices/bookSlice";

const CheckoutList = () => {
  const [books, setBooks] = useState([]);
  const [navState, setNavState] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = books.slice(startIndex, endIndex);

  const dispatch = useDispatch();
  // let bookDtos;

  useEffect(() => {
    axios
      .get(`/checkout_books/nav/${navState}`)
      .then((response) => {
        setBooks(response.data.dtos);
        const bookDtos = response.data;
        // console.log("bookDtos : ", bookDtos)

        dispatch(bookActions.fetchBookDto(bookDtos));
      })
      .catch((error) => console.log(error));
  }, [navState]);


  return (
    <Container>
      <BookListNav onNavStateChange={setNavState} />
      <Row>
        {displayedBooks.map((book) => {
          return <CheckoutListItem book={book} key={book.id} />;
        })}
      </Row>
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
