import React, { useEffect, useRef, useState } from "react";
import styles from "../../css/chat/Chat.module.css";
import MyChat from "./MyChat";
import OthersChat from "./OthersChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faBars,
  faPaperPlane,
  faPeopleGroup,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import api from "../../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../redux/chat/slices/chatSlice";
import { Loading } from "../common/Loading";

let stompClient = null;

const ChatArea = ({
  msg,
  setMsg,
  lastMsg,
  setLastMsg,
  roomId,
  setRoomId,
  user,
  roomName,
  getList,
}) => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  // const [msg, setMsg] = useState([]);
  // const [lastMsg, setLastMsg] = useState([]);
  const [inputText, setInputText] = useState("");

  const [currentUser, setCurrentUser] = useState("");
  const [userListShow, setUserListShow] = useState(false);

  let { storeUserList, storeUserDetail, loading } = useSelector(
    (state) => state.chat
  );
  // let { userDtos } = useSelector((state) => state.user);

  function connect() {
    // dispatch(chatActions.setLoading(true));
    var socket = new SockJS("/ws-stomp");
    stompClient = Stomp.over(socket);

    // dispatch(chatActions.setLoading(true));
    stompClient.connect({}, onConnected, console.log("error"));

    console.log("[connect] stompClient : ", stompClient);
  }

  function onConnected() {
    // lastMsg.splice(0, lastMsg.length);
    // msg.splice(0, msg.length);

    // setLastMsg([]);
    // setMsg([]);
    stompClient.subscribe("/sub/chat/room/" + roomId, onMessageReceived);

    stompClient.send(
      "/pub/chat/enterUser",
      {},
      JSON.stringify({
        roomId: roomId,
        sender: user.u_email,
        sendName: user.u_name,
        type: "ENTER",
      })
    );
  }

  function onDisConnected() {
    if (window.confirm("채팅방을 나가겠습니까?")) {
      stompClient.send(
        "/pub/chat/leaveUser",
        {},
        JSON.stringify({
          roomId: roomId,
          sender: user.u_email,
          sendName: user.u_name,
          type: "LEAVE",
        })
      );
      disConnect();
    }
  }

  function onMessageReceived(payload) {
    let arr = [];
    let temp = {};
    var chat = JSON.parse(payload.body);
    console.log("=========================");
    console.log("chat은 이거야", chat);
    let type = chat.type;
    let test = chat.currentUser;

    setCurrentUser(chat.currentUser);

    if (type == "REJECT" && test == user.u_email) {
      disConnect();
      alert("채팅방 정원이 가득 차 입장이 불가합니다.");
    } else if (type == "ENTER") {
      if (test == user.u_email && !chat.first) {
        console.log("lastMSG 넣기 전 : ", lastMsg);
        lastMsg.push(chat);
        // temp = chat;
        // lastMsg.push(temp);
        console.log("lastMSG 넣은 후: ", lastMsg);
        arr = lastMsg.filter((c) => c.roomId == roomId);
        // console.log(" ARRRRRRR :: ", arr);
        setLastMsg([...arr]);
        // console.log("lastMSG : ", lastMsg);
        getUserList();
      }

      if (chat.sender === "ADMIN" && chat.first) {
        chat.content = chat.sender + chat.message;
        msg.push(chat);
        setMsg([...msg]);
      }
      getUserList();
      getList();
    } else if (chat.type === "LEAVE") {
      msg.push(chat);
      setMsg([...msg]);
      getUserList();
      getList();
    } else {
      if (type !== "REJECT") {
        msg.push(chat);
        setMsg([...msg]);
      }
    }

    console.log("lastMsg LENGTH : ", lastMsg.length);

    // dispatch(chatActions.setLoading(false));
  }

  function getUserList() {
    api
      .get("/chat/userlist", {
        params: {
          roomId: roomId,
        },
      })
      .then(function (res) {
        dispatch(chatActions.getUserList(res.data.userList));
        dispatch(chatActions.getUserDetail(res.data.userDetail));
        console.log(res);
      })
      .catch(function (err) {
        console.log("getUserList", err);
      });
    console.log("[getUserList] stompClient : ", stompClient);
  }

  function sendMessage() {
    console.log("[sendMessage] stompClient : ", stompClient);
    if (stompClient) {
      var chatMessage = {
        roomId: roomId,
        sender: user.u_email,
        message: inputText,
        type: "TALK",
      };
      console.log("sendMessage");
      stompClient.send(
        "/pub/chat/sendMessage",
        {},
        JSON.stringify(chatMessage)
      );

      setInputText("");
    }
  }

  function disConnect() {
    console.log("disconnect");
    stompClient = null;
    setRoomId("");
  }

  const pressEnterSending = (e) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  const dropDownStateChange = () => {
    if (userListShow) {
      setUserListShow(false);
    }
  };

  useEffect(() => {
    // stompClient = null;
    // console.log("roomID 바뀜 :: ", roomId);
    // for (let i = 0; i < lastMsg.length; i++) {
    //   lastMsg.pop();
    // }
    // disConnect();
    // let arr = [];

    // lastMsg.splice(0, lastMsg.length);
    // msg.splice(0, msg.length);

    // setLastMsg([]);
    // setMsg([]);

    connect();

    api
      .get("/chat/user_detail", {
        params: {
          roomId: roomId,
        },
      })
      .then(function (res) {
        // dispatch(chatActions.getChatRoomList(res.data.list));
        console.log("가져왔어  ", res.data);
      })
      .catch(function (err) {
        console.log("list", err);
      });
  }, [roomId]);

  useEffect(() => {
    setUserList(storeUserList);
  }, [storeUserList]);

  useEffect(() => {
    getUserList();
    setUserList(storeUserList);
  }, []);

  const chattingLogRef = useRef(null);

  useEffect(() => {
    if (chattingLogRef.current) {
      chattingLogRef.current.scrollTop = chattingLogRef.current.scrollHeight;
    }
  }, [lastMsg, msg]);

  // if (loading) {
  //   return (
  //     <div className={styles.loading_chat_area}>
  //       <Loading />
  //     </div>
  //   );
  // }
  return (
    <div className={styles.chat_area} onClick={dropDownStateChange}>
      <div className={styles.icon_wrap}>
        <div className={styles.chatting_room_name}>
          <FontAwesomeIcon
            className={styles.close_chat_log}
            icon={faBackwardStep}
            onClick={() => disConnect()}
          />
          <span className={styles.chat_title_wrap}>
            {roomName}
            <span>
              <div className={styles.chat_user_list}>
                <span onClick={() => setUserListShow(!userListShow)}>
                  <FontAwesomeIcon icon={faUser} className={styles.user_icon} />
                  {storeUserList.length}
                </span>
                {userListShow && (
                  <ul className={styles.chat_user_list_drop}>
                    {storeUserList.map((n) => (
                      <li>
                        <img
                          src={
                            storeUserDetail.filter(
                              (u) => u.u_email == n.u_mail
                            )[0].u_image
                          }
                          alt=""
                        />
                        {n.u_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </span>
          </span>
        </div>
        {/* <span className={styles.chat_menu}>
          <FontAwesomeIcon icon={faBars} />
        </span> */}
        <span className={styles.leave_icon} onClick={onDisConnected}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          &nbsp; 채팅방 나가기
        </span>
      </div>

      <div className={styles.chatting}>
        <div className={styles.chatting_log} ref={chattingLogRef}>
          {lastMsg.map((item) =>
            item.sender == user.u_email ? (
              <MyChat item={item} />
            ) : (
              <OthersChat item={item} userList={userList} />
            )
          )}
          {msg.map((item) =>
            item.sender == user.u_email ? (
              <MyChat item={item} />
            ) : (
              <OthersChat item={item} userList={userList} />
            )
          )}
          {/* <MyChat msg={msg} /> */}
          {/* {data.map((chat) =>
            chat.user == 1 ? <MyChat chat={chat} /> : <OthersChat chat={chat} />
          )} */}
        </div>

        <div className={styles.input_chat}>
          <input
            type="text"
            placeholder="메세지를 입력하세요"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => pressEnterSending(e)}
          />
          <FontAwesomeIcon
            title="Send"
            className={styles.send_icon}
            icon={faPaperPlane}
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
