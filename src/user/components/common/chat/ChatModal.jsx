import React, { useState } from "react";
import styles from "../../../css/common/chat/ChatModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import ChatItem from "../chat/ChatItem";
import Chatting from "../chat/Chatting";

const ChatModal = () => {
  const [chatShow, setChatShow] = useState(false);
  return (
    <div className={`${styles.quick_menu} ${chatShow == true && styles.on}`}>
      <div className={styles.chat_box}>
        <div className={styles.chat_list}>
          <h4>MY STUDY CHAT</h4>
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </div>
        <div className={styles.chat_area}>
          <Chatting />
        </div>
      </div>
      <div className={styles.quick_btn} onClick={() => setChatShow(!chatShow)}>
        <FontAwesomeIcon className={styles.msg_icon} icon={faMessage} />
        <p>CHAT</p>
      </div>
    </div>
  );
};

export default ChatModal;
