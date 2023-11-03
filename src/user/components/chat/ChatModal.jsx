import React, { useEffect, useState } from "react";
import styles from "../../css/chat/Chat.module.css";
import { BiChat } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import api from "../../../redux/api";
import ChatArea from "./ChatArea";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../redux/chat/slices/chatSlice";
import { get } from "jquery";

const ChatModal = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [chatShow, setChatShow] = useState(0);

  const [newName, setNewName] = useState("");
  const [list, setList] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [userMaxCount, setUserMaxCount] = useState(2);
  const [leave, setLeave] = useState();

  const { userDto } = useSelector((state) => state.user);
  let { storeChatRoomList } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  // const [userName, setUserName] = useState("");

  const [roomName, setRoomName] = useState("");

  const leaveConfirm = () => {
    setLeave(window.confirm("나갈래요?"));
  };

  const createRoom = () => {
    console.log("dddd", userDto.u_mail);
    api
      .post("http://127.0.0.1:8090/chat/createroom", {
        newName: newName,
        userMaxCount: userMaxCount,
        userMail: userDto.u_email,
        userName: userDto.u_name,
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
          user: userDto.u_email,
        },
      })
      .then(function (res) {
        dispatch(chatActions.getChatRoomList(res.data.list));
        console.log("dsdsdsds", res.data.list);
      })
      .catch(function (err) {
        console.log("list err", err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setRoomId("");
    setRoomId(roomId);
  }, [roomId]);

  const showChat = () => {
    console.log("userDto", userDto);
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
                {/* <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                /> */}
                <br />
                <input
                  type="number"
                  onChange={(e) => setUserMaxCount(e.target.value)}
                />
              </div>

              {storeChatRoomList.map((item) => (
                <ChatItem
                  roomId={roomId}
                  setRoomId={setRoomId}
                  setRoomName={setRoomName}
                  item={item}
                  leaveConfirm={leaveConfirm}
                />
              ))}
            </div>

            {roomId !== "" ? (
              <ChatArea
                roomId={roomId}
                setRoomId={setRoomId}
                user={userDto}
                roomName={roomName}
                getList={getList}
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
