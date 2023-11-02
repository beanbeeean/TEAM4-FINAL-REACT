import React, { useEffect, useState } from "react";
import styles from "../../css/chat/Chat.module.css";
import MyChat from "./MyChat";
import OthersChat from "./OthersChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faPaperPlane,
  faPeopleGroup,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import api from "../../../redux/api";

let stompClient = null;

const ChatArea = ({ roomId, setRoomId, userName, roomName }) => {
  const [userList, setUserList] = useState([]);
  const [msg, setMsg] = useState([]);
  const [lastMsg, setLastMsg] = useState([]);
  const [inputText, setInputText] = useState("");

  const [currentUser, setCurrentUser] = useState("");

  function connect() {
    var socket = new SockJS("/ws-stomp");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, console.log("error"));
    console.log("[connect] stompClient : ", stompClient);
  }

  function onConnected() {
    stompClient.subscribe("/sub/chat/room/" + roomId, onMessageReceived);

    stompClient.send(
      "/pub/chat/enterUser",
      {},
      JSON.stringify({
        roomId: roomId,
        sender: userName,
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
          sender: userName,
          type: "LEAVE",
        })
      );

      disConnect();
    }
  }

  function onMessageReceived(payload) {
    let arr = [];
    var chat = JSON.parse(payload.body);
    console.log("=========================");
    console.log("chat은 이거야", chat);
    let type = chat.type;
    let test = chat.currentUser;

    setCurrentUser(chat.currentUser);

    if (type == "REJECT" && test == userName) {
      disConnect();
      alert("채팅방 정원이 가득 차 입장이 불가합니다.");
    } else if (type == "ENTER") {
      if (test == userName && !chat.first) {
        lastMsg.push(chat);
        arr = lastMsg.filter((c) => c.roomId == roomId);

        setLastMsg(arr);
        console.log("lastMSG : ", lastMsg);
      }

      if (chat.sender === "ADMIN" && chat.first) {
        chat.content = chat.sender + chat.message;
        msg.push(chat);
        setMsg([...msg]);
      }
    } else if (chat.type === "LEAVE") {
      msg.push(chat);
      setMsg([...msg]);
    } else {
      if (type !== "REJECT") {
        msg.push(chat);
        setMsg([...msg]);
      }
    }
    console.log("[onMessageReceived] stompClient : ", stompClient);
  }

  function getUserList() {
    api
      .get("/chat/userlist", {
        params: {
          roomId: roomId,
        },
      })
      .then(function (res) {
        setUserList(res.data);
        console.log(userList);
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
        sender: userName,
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

  useEffect(() => {
    connect();
  }, [roomId]);

  return (
    <div className={styles.chat_area}>
      <div className={styles.icon_wrap}>
        <div className={styles.chatting_room_name}>
          <FontAwesomeIcon
            className={styles.close_chat_log}
            icon={faBackwardStep}
            onClick={() => disConnect()}
          />
          {roomName}
        </div>
        <span className={styles.leave_icon} onClick={onDisConnected}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          &nbsp; 채팅방 나가기
        </span>
      </div>

      <div className={styles.chatting}>
        <div className={styles.chatting_log}>
          {lastMsg.map((item) =>
            item.sender == userName ? (
              <MyChat item={item} />
            ) : (
              <OthersChat item={item} />
            )
          )}
          {msg.map((item) =>
            item.sender == userName ? (
              <MyChat item={item} />
            ) : (
              <OthersChat item={item} />
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
