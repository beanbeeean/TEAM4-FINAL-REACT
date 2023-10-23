import React from "react";
import styles from "../../css/ReadRoom.module.css";
const ReadRoomMap = ({ setSeat, seat }) => {
  const selection = (e) => {
    console.log(e.target.textContent);
    setSeat(e.target.textContent);
  };

  return (
    <div className={styles.readroom_map}>
      <div className={styles.rm_first_line}>
        <table className={styles.eight}>
          <tr>
            <td
              className={`${seat == 1 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              1
            </td>
            <td
              className={`${seat == 2 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              2
            </td>
            <td
              className={`${seat == 3 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              3
            </td>
            <td
              className={`${seat == 4 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              4
            </td>
          </tr>
          <tr>
            <td
              className={`${seat == 5 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              5
            </td>
            <td
              className={`${seat == 6 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              6
            </td>
            <td
              className={`${seat == 7 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              7
            </td>
            <td
              className={`${seat == 8 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              8
            </td>
          </tr>
        </table>
        <table className={styles.ten}>
          <tr>
            <td
              className={`${seat == 9 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              9
            </td>
            <td
              className={`${seat == 10 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              10
            </td>
            <td
              className={`${seat == 11 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              11
            </td>
            <td
              className={`${seat == 12 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              12
            </td>
            <td
              className={`${seat == 13 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              13
            </td>
          </tr>
          <tr>
            <td
              className={`${seat == 14 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              14
            </td>
            <td
              className={`${seat == 15 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              15
            </td>
            <td
              className={`${seat == 16 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              16
            </td>
            <td
              className={`${seat == 17 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              17
            </td>
            <td
              className={`${seat == 18 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              18
            </td>
          </tr>
        </table>
        <table className={styles.ten}>
          <tr>
            <td
              className={`${seat == 19 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              19
            </td>
            <td
              className={`${seat == 20 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              20
            </td>
            <td
              className={`${seat == 21 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              21
            </td>
          </tr>
          <tr>
            <td
              className={`${seat == 22 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              22
            </td>
            <td
              className={`${seat == 23 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              23
            </td>
            <td
              className={`${seat == 24 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              24
            </td>
          </tr>
        </table>
      </div>
      <div className={styles.rm_second_line}>
        <table className={styles.six}>
          <tr>
            <td
              className={`${seat == 25 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              25
            </td>
            <td
              className={`${seat == 26 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              26
            </td>
            <td
              className={`${seat == 27 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              27
            </td>
          </tr>
          <tr>
            <td
              className={`${seat == 28 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              28
            </td>
            <td
              className={`${seat == 29 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              29
            </td>
            <td
              className={`${seat == 30 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              30
            </td>
          </tr>
        </table>
        <div className={styles.door_wrap}>
          <div className={styles.left_door}></div>
          <div className={styles.right_door}></div>
        </div>
        <table className={styles.eight}>
          <tr>
            <td
              className={`${seat == 31 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              31
            </td>
            <td
              className={`${seat == 32 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              32
            </td>
            <td
              className={`${seat == 33 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              33
            </td>
            <td
              className={`${seat == 34 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              34
            </td>
          </tr>
          <tr>
            <td
              className={`${seat == 35 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              35
            </td>
            <td
              className={`${seat == 36 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              36
            </td>
            <td
              className={`${seat == 37 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              37
            </td>
            <td
              className={`${seat == 38 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              38
            </td>
          </tr>
        </table>
        <table className={styles.six}>
          <tr>
            <td
              className={`${seat == 39 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              39
            </td>
            <td
              className={`${seat == 40 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              40
            </td>
            <td
              className={`${seat == 41 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              41
            </td>
          </tr>
          <tr>
            <td
              className={`${seat == 42 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              42
            </td>
            <td
              className={`${seat == 43 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              43
            </td>
            <td
              className={`${seat == 44 && styles.user_select}`}
              onClick={(e) => selection(e)}
            >
              44
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ReadRoomMap;
