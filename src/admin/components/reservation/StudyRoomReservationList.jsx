import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/reservation/ReservationManagement.module.css";
import { adminStudyRoom } from "../../../user/components/common/login/APIUtils";
import { PaginationControl } from "react-bootstrap-pagination-control";
const StudyRoomReservationList = () => {

  const [page, setPage] = useState(1);
  const [studyRoom, setStudyRoom] = useState([]);
  const [keyword, setKeyword] = useState("");

  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedLists = studyRoom.slice(startIndex, endIndex);

  useEffect(() => {
    adminStudyRoom({keyword})
    .then((response) => {
      const result = response.data;
      console.log("response.data : ", response.data);
      setStudyRoom(response.data);
      if (result == 1) {
        alert("상태가 변경되었습니다.");
      }
    })
    .catch((error) => console.log(error));
  }, [keyword]);

  return (
    <div>
    <table className={stylesAdmin.reservation_studyroom_table}>
      <thead>
        <tr>
          <th>NO</th>
          <th>USER</th>
          <th>ROOM</th>
          <th>IN</th>
          <th>OUT</th>
          <th>RES_DATE</th>
        </tr>
      </thead>
      <tbody>
      {displayedLists.map((item)=> (
            <tr className={stylesAdmin.reservation_list}>
              <td>1</td>
              <td>{item.sr_email}</td>
              <td>{item.sr_name}</td>
              <td>{item.sr_date.toString().slice(0, 4)+"-"+item.sr_date.toString().slice(4, 6)+"-"+item.sr_date.toString().slice(6, 8) + " " + item.sr_time+":00"}</td>
              <td>{item.sr_date.toString().slice(0, 4)+"-"+item.sr_date.toString().slice(4, 6)+"-"+item.sr_date.toString().slice(6, 8) + " " + (item.sr_time+1)+":00"}</td>
              <td>{item.sr_reg_date.substring(0, 16)}</td>
            </tr>
        ))
        }
      </tbody>
    </table><br/>
    <PaginationControl
        page={page}
        between={4}
        total={studyRoom.length}
        limit={10}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </div>
  );
};

export default StudyRoomReservationList;