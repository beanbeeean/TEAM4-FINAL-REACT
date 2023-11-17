import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/reservation/ReservationManagement.module.css";
import { adminStudyRoomLog } from "../../../user/components/common/login/APIUtils";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const StudyRoomReservationList = () => {
  const [page, setPage] = useState(1);
  const [studyRoom, setStudyRoom] = useState([]);
  const [keyword, setKeyword] = useState("");

  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedLists = studyRoom.slice(startIndex, endIndex);

  useEffect(() => {
    adminStudyRoomLog({ keyword })
      .then((response) => {
        const result = response.data;
        console.log("response.data : ", response.data);
        setStudyRoom(response.data);
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
      <table className={stylesAdmin.reservation_studyroom_table}>
        <thead>
          <tr>
            <th>번호</th>
            <th>이메일</th>
            <th>스터디룸</th>
            <th>입실 시간</th>
            <th>퇴실 시간</th>
            <th>예약 시간</th>
          </tr>
        </thead>
        <tbody>
          {displayedLists.map((item) => (
            <tr className={stylesAdmin.reservation_list}>
              <td>{item.sr_no}</td>
              <td>{item.sr_email}</td>
              <td>{item.sr_name}</td>
              <td>
                {item.sr_date.toString().slice(0, 4) +
                  "-" +
                  item.sr_date.toString().slice(4, 6) +
                  "-" +
                  item.sr_date.toString().slice(6, 8) +
                  " " +
                  item.sr_time +
                  ":00"}
              </td>
              <td>
                {item.sr_date.toString().slice(0, 4) +
                  "-" +
                  item.sr_date.toString().slice(4, 6) +
                  "-" +
                  item.sr_date.toString().slice(6, 8) +
                  " " +
                  (item.sr_time + 1) +
                  ":00"}
              </td>
              <td>{item.sr_reg_date.substring(0, 16)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <PaginationControl
        page={page}
        between={4}
        total={studyRoom.length}
        limit={itemsPerPage}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};

export default StudyRoomReservationList;
