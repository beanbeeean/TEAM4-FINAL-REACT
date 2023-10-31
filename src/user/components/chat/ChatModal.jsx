import React, { useEffect, useState } from "react";
import styles from "../../css/chat/Chat.module.css";
import { BiChat } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import api from "../../../redux/api";
import ChatArea from "./ChatArea";
import ChatItem from "./ChatItem";

const ChatModal = () => {
  // const [show, setShow] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [chatShow, setChatShow] = useState(0);
  // const [isChatClicked, setIsChatClicked] = useState(false);
  // const navigate = useNavigate();

  const [showChatList, setShowChatList] = useState(0);
  const [newName, setNewName] = useState("");
  const [list, setList] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [userMaxCount, setUserMaxCount] = useState(2);
  const [leave, setLeave] = useState();
  const [userName, setUserName] = useState("");

  const leaveConfirm = () => {
    setLeave(window.confirm("나갈래요?"));
  };

  const createRoom = () => {
    api
      .post("http://127.0.0.1:8090/chat/createroom", {
        newName: newName,
        userMaxCount: userMaxCount,
        userName: userName,
      })
      .then(function (response) {
        console.log(response);
        getList();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getList = () => {
    api
      .get("http://127.0.0.1:8090/chat/list", {
        params: {
          userName: userName,
        },
      })
      .then(function (res) {
        setList(res.data.list);
        console.log("list res", list);
      })
      .catch(function (err) {
        console.log("list err", err);
      });
  };

  useEffect(() => {
    // console.log("show ", showChatList);
    console.log(newName);
  }, [newName]);

  useEffect(() => {
    getList();
  }, [userName]);

  const showChat = () => {
    console.log("showChat");
    if (chatShow == 1) {
      setChatShow(0);
      setIsClicked(0);
    } else {
      setIsClicked(1);
      setChatShow(1);
    }
  };

  return (
    <div className={`${styles.quick_menu} ${styles.on}`}>
      <div className={styles.quick_btn} onClick={() => showChat()}>
        <BiChat
          className={`${styles.msg_icon} ${isClicked && styles.icon_clicked} `}
        />
      </div>
      {chatShow == 1 && (
        <>
          <div className={styles.chat_box}>
            <div className={styles.chat_list}>
              <h4 className={styles.chat_list_tit}>CHAT LIST</h4>
              <div>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  id="roomName"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button
                  class="btn btn-secondary"
                  id="create"
                  onClick={createRoom}
                >
                  개설하기
                </button>
                <br />
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <br />
                <input
                  type="number"
                  onChange={(e) => setUserMaxCount(e.target.value)}
                />
              </div>

              {list.map((item) => (
                <ChatItem
                  setRoomId={setRoomId}
                  item={item}
                  leaveConfirm={leaveConfirm}
                />
                // <li className="list-group-item d-flex justify-content-between align-items-start">
                //   <div className="ms-2 me-auto">
                //     <div className="fw-bold">
                //       <a onClick={() => setRoomId(item.roomId)}>
                //         {item.roomName}
                //       </a>
                //     </div>
                //   </div>
                //   <span className="badge bg-primary rounded-pill">
                //     {item.userCount}명
                //   </span>
                //   <button onClick={leaveConfirm}>채팅방 나가기</button>
                // </li>
              ))}
              {/* <div>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="roomName"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button
                  className="btn btn-secondary"
                  id="create"
                  onClick={test}
                >
                  개설하기
                </button>
                <br />
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <br />
                <input
                  type="number"
                  onChange={(e) => setUserMaxCount(e.target.value)}
                />
              </div> */}
            </div>

            {roomId !== "" ? (
              <ChatArea
                roomId={roomId}
                setRoomId={setRoomId}
                userName={userName}
                leave={leave}
              />
            ) : (
              <div className={styles.chat_area}>없음</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatModal;
