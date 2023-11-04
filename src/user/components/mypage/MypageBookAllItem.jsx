import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MypageBookAllItem = ({ item }) => {
  const { bookDto } = useSelector((state) => state.book);
  const book = bookDto.filter((e) => e.b_no === item.b_no);

  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <>
      {book[0] != undefined && (
        <tr>
          <td>
            <Link to={`/checkout_books/${book[0].b_no}`}>
              {book[0].b_title}
            </Link>
          </td>
          <td>{book[0].b_author}</td>
          <td>{book[0].b_publisher}</td>
          <td>
            {dateFormat(item.chk_b_start_date)} ~{" "}
            {dateFormat(item.chk_b_end_date)}
          </td>
          <td>{dateFormat(item.chk_b_mod_date)}</td>
        </tr>
      )}
    </>
  );
};

export default MypageBookAllItem;
