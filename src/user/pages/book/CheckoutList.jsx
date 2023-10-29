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
  const bookDtos = useSelector((state) => state.book);
  console.log("bookDtos : ", bookDtos);
  useEffect(() => {
    // axios
    //   .get(`/checkout_books/${navState}`)
    //   .then((response) => setBooks(response.data.dtos))
    //   .catch((error) => console.log(error));
    axios
      .get("/checkout_books")
      .then((response) => {
        setBooks(response.data.dtos);
        console.log(response);
        const bookDtos = response.data;

        dispatch(bookActions.fetchBookDto(bookDtos));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <BookListNav onNavStateChange={setNavState} />
      {/* <Row>
        {books.map((book) => {
          return <CheckoutListItem book={book} />;
        })}
      </Row> */}
      <Row>
        {displayedBooks.map((book) => {
          return <CheckoutListItem book={book} key={book.id} />;
        })}
      </Row>
      {/* <Pagination className={styles.book_pagenation}>
        <Pagination.Prev />
        {Array.from(
          { length: Math.ceil(books.length / itemsPerPage) },
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === page}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next />
      </Pagination> */}

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
