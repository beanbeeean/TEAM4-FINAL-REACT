import React from "react";
import styles from "../../css/chat/Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FaTrashAlt } from "react-icons/fa";

const ChatItem = ({ setRoomId, item }) => {
  const deleteChat = () => {
    alert("채팅방을 나가시겠습니까?");
  };

  return (
    <div className={styles.chat_room} onClick={() => setRoomId(item.roomId)}>
      <div className={styles.chat_room_title}>
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
