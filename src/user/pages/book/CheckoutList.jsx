import React from "react";
import { Container } from "react-bootstrap";
import BookListNav from "../../components/book/BookListNav";
import CheckoutListItem from "../../components/book/CheckoutListItem";

const CheckoutList = () => {
  const books = [
    {
      b_no: 1,
      b_title: "책으로 가는 문 - 이와나미소년문고를 이야기하다",
      b_writer: "미야자키 하야오",
      b_publisher: "다우출판사",
      b_count: "5",
    },
    {
      b_no: 2,
      b_title: "집에 가고싶다",
      b_writer: "이시영",
      b_publisher: "시영출판사",
      b_count: "2",
    },
    {
      b_no: 3,
      b_title: "오늘 달이 참 이쁘네요",
      b_writer: "홍재희",
      b_publisher: "재희출판사",
      b_count: "5",
    },
    {
      b_no: 3,
      b_title: "오늘 달이 참 이쁘네요",
      b_writer: "홍재희",
      b_publisher: "재희출판사",
      b_count: "4",
    },
    {
      b_no: 3,
      b_title: "오늘 달이 참 이쁘네요",
      b_writer: "홍재희",
      b_publisher: "재희출판사",
      b_count: "5",
    },
  ];

  return (
    <Container>
      <BookListNav />
      {books.map((book) => {
        return <CheckoutListItem book={book} />;
      })}
    </Container>
  );
};

export default CheckoutList;
