import React, { useState } from "react";
import stylesAdmin from "../../css/book/BookManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { BsArrowReturnRight } from "react-icons/bs";

const BookManagement = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>BOOK MANAGEMENT</h2>
      <div className={stylesAdmin.search_book}>
        <input type="text" placeholder="SEARCH BOOK" />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={stylesAdmin.search_book_btn}
        />
      </div>
      <div className={stylesAdmin.book_list}>
        <table className={stylesAdmin.book_wrap}>
          <thead>
            <tr>
              <th>NO</th>
              <th>ISBN</th>
              <th>TITLE</th>
              <th>AUTHOR</th>
              <th>PUBLISHER</th>
              <th>STOCK</th>
              <th>STATE</th>
              <th>CHANGE</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <React.Fragment key={index}>
                <tr
                  className={`${stylesAdmin.user_item} ${
                    selectedRow === index ? stylesAdmin.selected_row : ""
                  }`}
                  onClick={() => handleRowClick(index)}
                >
                  <td>1</td>
                  <td>15035</td>
                  <td>잭과 콩나물</td>
                  <td>siyeong</td>
                  <td>beanbeeean</td>
                  <td>5</td>
                  <td>사용가능</td>
                  <td>
                    <input type="button" value="상태변경" />
                  </td>
                </tr>
                {selectedRow === index && (
                  <>
                    <tr
                      className={`${stylesAdmin.user_item_nav} ${stylesAdmin.addtional_row}`}
                    >
                      <td>
                        <BsArrowReturnRight />
                      </td>
                      <td>BNO</td>
                      <td>UNO</td>
                      <td>UID</td>
                      <td>START DATE</td>
                      <td>END DATE</td>
                      <td>STATE</td>
                      <td>CHANGE</td>
                    </tr>
                    <tr
                      className={`${stylesAdmin.user_item} ${stylesAdmin.addtional_row}`}
                    >
                      <td>
                        <BsArrowReturnRight />
                      </td>
                      <td>user</td>
                      <td>5</td>
                      <td>sy1013</td>
                      <td>2023.10.25</td>
                      <td>2023.11.01</td>
                      <td>대여중</td>
                      <td>
                        <input type="button" value="반납" />
                      </td>
                    </tr>
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
