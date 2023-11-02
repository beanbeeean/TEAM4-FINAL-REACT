import React from "react";
import styles from "../../css/chat/Chat.module.css";
const MyChat = ({ item }) => {
  return (
    <div className={styles.mine}>
      <span className={styles.chat_time}>{item.time}</span>
      <span className={styles.chat_text}>{item.message}</span>
    </div>
  );
};

export default MyChat;
