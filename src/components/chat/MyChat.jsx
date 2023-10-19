import React from "react";
import styles from "./css/Chatting.module.css";
const MyChat = ({ chat }) => {
  return (
    <div className={styles.mine}>
      <span>{chat.text}</span>
    </div>
  );
};

export default MyChat;
