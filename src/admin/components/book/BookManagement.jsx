import React, { useState } from "react";
import stylesAdmin from "../../css/book/BookManagement.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CheckoutUserModal from "./CheckoutUserModal";
import ChangeStateModal from "./ChangeStateModal";

const BookManagement = () => {
  const [coutModalShow, setCoutModalShow] = useState(false);
  const [stateShow, setStateShow] = useState(false);

  const changeState = () => {
    console.log("changeState");
    alert("수량변경");
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
            <tr>
              <td>1</td>
              <td>15035</td>
              <td onClick={() => setCoutModalShow(true)}>잭과 콩나물</td>
              <td>siyeong</td>
              <td>beanbeeean</td>
              <td>5</td>
              <td>사용가능</td>
              <td>
                <input
                  type="button"
                  value="상태변경"
                  onClick={() => setStateShow(true)}
                />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>15035</td>
              <td onClick={() => setCoutModalShow(true)}>잭과 콩나물</td>
              <td>siyeong</td>
              <td>beanbeeean</td>
              <td>5</td>
              <td>사용가능</td>
              <td>
                <input
                  type="button"
                  value="상태변경"
                  onClick={() => setStateShow(true)}
                />
              </td>
            </tr>
          </tbody>
          <CheckoutUserModal
            show={coutModalShow}
            onHide={() => setCoutModalShow(false)}
          />
          <ChangeStateModal
            show={stateShow}
            onHide={() => setStateShow(false)}
          />
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
