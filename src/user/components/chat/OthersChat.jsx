import React, { useState } from "react";
import styles from "../../css/chat/Chat.module.css";
import { useSelector } from "react-redux";
const OthersChat = ({ item, userList }) => {
  let { storeUserList } = useSelector((state) => state.chat);
  let [user, setUser] = useState(
    storeUserList.filter((e) => e.u_mail == item.sender)
  );

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
          <p className={styles.user_name}>
            {user.length > 0 ? user[0].u_name : "(알 수 없음)"}
          </p>
          {/* <p className={styles.user_name}>{item.sender}</p> */}
          <span className={styles.chat_text}>{item.message}</span>
          <span className={styles.chat_time}>{item.time}</span>
        </div>
      )}
    </>
  );
};

export default OthersChat;
