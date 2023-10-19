import React from "react";
import styles from "./css/Chatting.module.css";
const OthersChat = ({ chat }) => {
  return (
    <div className={styles.others}>
      <span>{chat.text}</span>
    </div>
  );
};

export default OthersChat;
