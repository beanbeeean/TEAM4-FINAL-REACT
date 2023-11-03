import React, { useEffect } from "react";
import styles from "../../css/chat/Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FaTrashAlt } from "react-icons/fa";

const ChatItem = ({ roomId, setRoomId, setRoomName, item }) => {
  const changeChatRoom = (item) => {
    setRoomId("");
    setRoomId(item.roomId);
    setRoomName(item.roomName);
  };

  return (
    <div className={styles.chat_room} onClick={() => changeChatRoom(item)}>
      <div
        className={`${styles.chat_room_title} ${
          roomId == item.roomId && styles.chat_room_on
        }`}
      >
        <div className={styles.chatting_room}>
          <FontAwesomeIcon className={styles.group_icon} icon={faPeopleGroup} />
          <br />
          <span className={styles.group_name}>{item.roomName}</span>
          <span className={styles.user_cnt}>{item.userCount}명</span>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
