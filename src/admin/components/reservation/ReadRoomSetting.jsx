import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/reservation/ReadRoomSetting.module.css";
import axios from "axios";
import { adminSeat } from "../../../user/components/common/login/APIUtils";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const ReadRoomSetting = () => {
  const [seat, setSeat] = useState();
  const [activeTap, setActiveTap] = useState(1);
  const [state, setState] = useState();
  const [readRoom, setReadRoom] = useState();

  const selection = (e) => {
    console.log(e.target.textContent);
    console.log(activeTap);
    console.log((e.target.textContent - 1) * (activeTap - 1) * 44);
    console.log(
      readRoom[e.target.textContent - 1 + (activeTap - 1) * 44].re_state
    );
    if (readRoom[e.target.textContent - 1 + (activeTap - 1) * 44].re_state) {
      setState(1);
    } else {
      setState(0);
    }
    setSeat(e.target.textContent);
  };

  const saveState = (e) => {
    adminSeat({ re_state: e, re_room_no: activeTap, re_seat: seat })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "수정 되었습니다.",
          iconColor: "rgb(33, 41, 66)",
          showConfirmButton: false,
          timer: 3000,
        });
        seatHandle();
        setSeat(0);
      })
      .catch((error) => console.log(error));
  };

  const floorSelect = (num) => {
    setSeat();
    setActiveTap(num);
  };

  const seatHandle = (event) => {
    axios
      .get("http://localhost:8090/read/seat?")
      .then((response) => {
        console.log(response.data);
        setReadRoom(response.data);
        // dispatch(seatChk());
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    seatHandle();
  }, [activeTap]);

  return (
    <div className={stylesAdmin.readroom_content}>
      <div className={stylesAdmin.readroom_map_wrap}>
        <div className={stylesAdmin.readroom_tap}>
          <ul>
            <li
              onClick={() => floorSelect(1)}
              className={`${activeTap == 1 && stylesAdmin.active_floor}`}
            >
              제 1 열람실
            </li>
            <li
              className={`${activeTap == 2 && stylesAdmin.active_floor}`}
              onClick={() => floorSelect(2)}
            >
              제 2 열람실
            </li>
            <li
              className={`${activeTap == 3 && stylesAdmin.active_floor}`}
              onClick={() => floorSelect(3)}
            >
              제 3 열람실
            </li>
          </ul>
        </div>
        <div className={stylesAdmin.readroom_map}>
          <div className={stylesAdmin.rm_first_line}>
            <table className={stylesAdmin.eight}>
              <tr>
                <td
                  className={`${seat == 1 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  1
                </td>
                <td
                  className={`${seat == 2 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  2
                </td>
                <td
                  className={`${seat == 3 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  3
                </td>
                <td
                  className={`${seat == 4 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  4
                </td>
              </tr>
              <tr>
                <td
                  className={`${seat == 5 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  5
                </td>
                <td
                  className={`${seat == 6 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  6
                </td>
                <td
                  className={`${seat == 7 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  7
                </td>
                <td
                  className={`${seat == 8 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  8
                </td>
              </tr>
            </table>
            <table className={stylesAdmin.ten}>
              <tr>
                <td
                  className={`${seat == 9 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  9
                </td>
                <td
                  className={`${seat == 10 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  10
                </td>
                <td
                  className={`${seat == 11 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  11
                </td>
                <td
                  className={`${seat == 12 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  12
                </td>
                <td
                  className={`${seat == 13 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  13
                </td>
              </tr>
              <tr>
                <td
                  className={`${seat == 14 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  14
                </td>
                <td
                  className={`${seat == 15 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  15
                </td>
                <td
                  className={`${seat == 16 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  16
                </td>
                <td
                  className={`${seat == 17 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  17
                </td>
                <td
                  className={`${seat == 18 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  18
                </td>
              </tr>
            </table>
            <table className={stylesAdmin.ten}>
              <tr>
                <td
                  className={`${seat == 19 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  19
                </td>
                <td
                  className={`${seat == 20 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  20
                </td>
                <td
                  className={`${seat == 21 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  21
                </td>
              </tr>
              <tr>
                <td
                  className={`${seat == 22 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  22
                </td>
                <td
                  className={`${seat == 23 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  23
                </td>
                <td
                  className={`${seat == 24 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  24
                </td>
              </tr>
            </table>
          </div>
          <div className={stylesAdmin.rm_second_line}>
            <table className={stylesAdmin.six}>
              <tr>
                <td
                  className={`${seat == 25 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  25
                </td>
                <td
                  className={`${seat == 26 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  26
                </td>
                <td
                  className={`${seat == 27 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  27
                </td>
              </tr>
              <tr>
                <td
                  className={`${seat == 28 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  28
                </td>
                <td
                  className={`${seat == 29 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  29
                </td>
                <td
                  className={`${seat == 30 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  30
                </td>
              </tr>
            </table>
            <div className={stylesAdmin.door_wrap}>
              <div className={stylesAdmin.left_door}></div>
              <div className={stylesAdmin.right_door}></div>
            </div>
            <table className={stylesAdmin.eight}>
              <tr>
                <td
                  className={`${seat == 31 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  31
                </td>
                <td
                  className={`${seat == 32 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  32
                </td>
                <td
                  className={`${seat == 33 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  33
                </td>
                <td
                  className={`${seat == 34 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  34
                </td>
              </tr>
              <tr>
                <td
                  className={`${seat == 35 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  35
                </td>
                <td
                  className={`${seat == 36 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  36
                </td>
                <td
                  className={`${seat == 37 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  37
                </td>
                <td
                  className={`${seat == 38 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  38
                </td>
              </tr>
            </table>
            <table className={stylesAdmin.six}>
              <tr>
                <td
                  className={`${seat == 39 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  39
                </td>
                <td
                  className={`${seat == 40 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  40
                </td>
                <td
                  className={`${seat == 41 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  41
                </td>
              </tr>
              <tr>
                <td
                  className={`${seat == 42 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  42
                </td>
                <td
                  className={`${seat == 43 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  43
                </td>
                <td
                  className={`${seat == 44 && stylesAdmin.user_select}`}
                  onClick={(e) => selection(e)}
                >
                  44
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className={stylesAdmin.divide_line}></div>
      <div className={stylesAdmin.readroom_admin_card}>
        <div className={stylesAdmin.selected_seat_info}>
          <div>
            <div>열람실</div>
            <div>{seat > 0 && "제 " + activeTap + " 열람실"}</div>
          </div>
          <div>
            <div>좌석 번호</div>
            <div>{seat > 0 && seat + "번"}</div>
          </div>
          <div>
            <div>현재 상태</div>
            <div>{seat > 0 ? (state ? "가능" : "불가능") : ""}</div>
          </div>
        </div>
        <div className={stylesAdmin.status_btn}>
          <div onClick={(e) => saveState(1)}>예약 가능</div>
          <div onClick={(e) => saveState(0)}>예약 불가능</div>
        </div>
      </div>
    </div>
  );
};

export default ReadRoomSetting;