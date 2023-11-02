import React from "react";
import styles from "../../css/chat/Chat.module.css";
const OthersChat = ({ item }) => {
  return (
    <>
      {item.type == "NOTICE" ? (
        <div className={styles.chat_date}>
          <span>{item.message}</span>
        </div>
      ) : item.sender == "ADMIN" ? (
        <div className={styles.admins}>
          <span>{item.message}</span>
        </div>
      ) : (
        <div className={styles.others}>
          <p className={styles.user_name}>{item.sender}</p>
          <span className={styles.chat_text}>{item.message}</span>
          <span className={styles.chat_time}>{item.time}</span>
        </div>
      )}
    </>
  );
};

export default OthersChat;
