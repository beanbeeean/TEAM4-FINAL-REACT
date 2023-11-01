import React, { useState } from "react";
import stylesAdmin from "../../css/book/BookManagement.module.css";
import CheckoutUserModal from "./CheckoutUserModal";
import ChangeStateModal from "./ChangeStateModal";

const AdminBookListItem = ({ book }) => {
  const [coutModalShow, setCoutModalShow] = useState(false);
  const [stateShow, setStateShow] = useState(false);

  return (
    <tr>
      <td>{book.b_no}</td>
      <td>{book.b_isbn}</td>
      <td onClick={() => setCoutModalShow(true)}>{book.b_title}</td>
      <td>{book.b_author}</td>
      <td>{book.b_publisher}</td>
      <td>{book.b_stock}</td>
      <td>{book.b_state == 1 ? "사용가능" : "사용불가"}</td>
      <td>
        <input
          type="button"
          value="상태변경"
          onClick={() => setStateShow(true)}
        />
      </td>
      <CheckoutUserModal
        book={book}
        show={coutModalShow}
        onHide={() => setCoutModalShow(false)}
      />
      <ChangeStateModal
        show={stateShow}
        // onSave={handleSave}
        book={book}
        onHide={() => setStateShow(false)}
      />
    </tr>
  );
};

export default AdminBookListItem;
