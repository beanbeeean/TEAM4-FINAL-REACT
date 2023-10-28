import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BookListNav from "../../components/book/BookListNav";
import CheckoutListItem from "../../components/book/CheckoutListItem";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import styles from "../../css/book/BookCoutList.module.css";
import { PaginationControl } from "react-bootstrap-pagination-control";

const CheckoutList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = books.slice(startIndex, endIndex);

  useEffect(() => {
    axios
      .get("/checkout_books")
      .then((response) => setBooks(response.data.dtos))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <BookListNav />
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
