import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/book/BookManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { bookActions } from "../../../redux/book/slices/bookSlice";
import { Loading } from "../../../user/components/common/Loading";
import { PaginationControl } from "react-bootstrap-pagination-control";
import AdminBookListNav from "./AdminBookListNav";
import AdminBookListItem from "./AdminBookListItem";

const BookManagement = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [navState, setNavState] = useState("all");
  const [searchBook, setSearchBook] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = books.slice(startIndex, endIndex);

  const dispatch = useDispatch();
  const { bookDto } = useSelector((state) => state.book);

  useEffect(() => {
    let arr = [];
    axios
      .get(`/admin/management/bookManagement`, {
        params: {
          category: navState,
          keyword: searchBook,
        },
      })
      .then((response) => {
        const bookDtos = response.data;
        dispatch(bookActions.fetchBookDto(bookDtos));
        arr = Array.from(response.data.dtos);
        setLoading(false);
        setBooks(arr);
      })
      .catch((error) => console.log(error));
  }, [navState, searchBook]);

  useEffect(() => {
    setBooks(bookDto);
  }, [bookDto]);

  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>BOOK MANAGEMENT</h2>

      <AdminBookListNav
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
        <div>
          <div className={stylesAdmin.book_list}>
            <table className={stylesAdmin.book_wrap}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>ISBN</th>
                  <th>제목</th>
                  <th>제목</th>
                  <th>작가</th>
                  <th>재고</th>
                  <th>상태</th>
                  <th>변경</th>
                </tr>
              </thead>
              <tbody>
                {displayedBooks.map((book) => (
                  <AdminBookListItem book={book} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
    </div>
  );
};

export default BookManagement;
