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
          <h5>BTC DEVELOPER STUDY</h5>
        </div>
        <span>1일전</span>
      </div>
      <div className={styles.chat_room_latest}>
        <p>아이구</p>
      </div>
    </div>
  );
};

export default ChatItem;