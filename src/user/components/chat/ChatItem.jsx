import React, { useEffect } from "react";
import styles from "../../css/chat/Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { BsFillPeopleFill } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { chatActions } from "../../../redux/chat/slices/chatSlice";

const ChatItem = ({
  msg,
  setMsg,
  lastMsg,
  setLastMsg,
  roomId,
  setRoomId,
  setRoomName,
  item,
}) => {
  const dispatch = useDispatch();
  const changeChatRoom = (item) => {
    setRoomId("");
    setRoomId(item.roomId);
    setRoomName(item.roomName);
    lastMsg.splice(0, lastMsg.length);
    msg.splice(0, msg.length);
    setLastMsg([]);
    setMsg([]);
    // dispatch(chatActions.setLoading(true));
  };

  return (
    <div
      className={`${styles.chat_room} ${
        roomId == item.roomId && styles.chat_room_on
      }`}
      onClick={() => changeChatRoom(item)}
    >
      <div className={styles.chat_room_title}>
        <div className={styles.chatting_room}>
          <FontAwesomeIcon className={styles.group_icon} icon={faUserGroup} />
          <br />
          <span className={styles.group_name}>{item.roomName}</span>
          <span className={styles.user_cnt}>{item.userCount}명</span>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
