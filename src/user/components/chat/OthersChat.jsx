import React, { useState } from "react";
import styles from "../../css/chat/Chat.module.css";
import { useSelector } from "react-redux";
const OthersChat = ({ item, userList }) => {
  let { storeUserList, storeUserDetail } = useSelector((state) => state.chat);
  let [user, setUser] = useState(
    storeUserList.filter((e) => e.u_mail == item.sender)
  );

  return (
    <>
      {item.type == "NOTICE" ? (
        <div className={styles.admins}>
          <span>{item.message}</span>
        </div>
      ) : item.sender == "ADMIN" ? (
        <div className={styles.admins}>
          <span>{item.message}</span>
        </div>
      ) : (
        <div className={styles.others}>
          <div className={styles.others_img}>
            {/* <img
              src={
                storeUserList.filter((u) => u.u_email == user[0].u_mail)[0]
                  .u_image
              }
              alt=""
            /> */}
          </div>
          <div>
            <p className={styles.user_name}>
              {user.length > 0 ? user[0].u_name : "(알 수 없음)"}
            </p>
            <span className={styles.chat_text}>{item.message}</span>
            <span className={styles.chat_time}>{item.time}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default OthersChat;
