import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/reservation/ReservationManagement.module.css";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { adminReadRoomLog } from "../../../user/components/common/login/APIUtils";
import { adminReadRoom } from "../../../user/components/common/login/APIUtils";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const ReadRoomReservationList = () => {
  const [page, setPage] = useState(1);
  const [readRoom, setReadRoom] = useState([]);
  const [keyword, setKeyword] = useState("");

  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedLists = readRoom.slice(startIndex, endIndex);

  useEffect(() => {
    adminReadRoomLog({keyword})
    .then((response) => {
      const result = response.data;
      console.log("response.data : ", response.data);
      setReadRoom(response.data);
      if (result == 1) {
        alert("상태가 변경되었습니다.");
      }
    })
    .catch((error) => console.log(error));
    adminReadRoom({ keyword })
      .then((response) => {
        const result = response.data;
        console.log("response.data : ", response.data);
        setReadRoom(response.data);
        if (result == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "상태가 변경되었습니다.",
            iconColor: "rgb(33, 41, 66)",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => console.log(error));
  }, [keyword]);

  return (
    <div>
      <table className={stylesAdmin.reservation_seat_table}>
        <thead>
          <tr>
            <th>번호</th>
            <th>이메일</th>
            <th>열람실</th>
            <th>좌석</th>
            <th>입실 시간</th>
            <th>퇴실 시간</th>
          </tr>
        </thead>
        <tbody>
          {displayedLists.map((item) => (
            <tr className={stylesAdmin.reservation_list}>
              <td>1</td>
              <td>{item.l_email}</td>
              <td>{item.l_room_no}F</td>
              <td>{item.l_seat}번</td>
              <td>{item.l_reg_date.substring(0, 16)}</td>
              <td>{item.l_end_date.substring(0, 16)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <PaginationControl
        page={page}
        between={4}
        total={readRoom.length}
        limit={itemsPerPage}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};

export default ReadRoomReservationList;
