import React from "react";
import styles from "./css/ChatItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

const ChatItem = () => {
  return (
    <div className={styles.chat_room}>
      <div className={styles.chat_room_title}>
        <div>
          <FontAwesomeIcon className={styles.group_icon} icon={faPeopleGroup} />
          <br />
          <span className={styles.group_name}>BTC DEVELOPER STUDY</span>
        </div>
      </div>
      <div className={styles.chat_room_latest}>
        <span>아이구</span>
        <span>1일전</span>
      </div>
    </div>
  );
};

export default ChatItem;
