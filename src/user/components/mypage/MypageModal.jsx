import React, { useState } from "react";
import styles from "../../css/mypage/MypageModal.module.css";
import { BiChat } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ChatItem from "../common/chat/ChatItem";
import Chatting from "../common/chat/Chatting";

const MypageModal = () => {
  const [show, setShow] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [chatShow, setChatShow] = useState(0);
  const [isChatClicked, setIsChatClicked] = useState(false);
  const navigate = useNavigate();

  const showChat = () => {
    console.log("showChat");
    if (chatShow == 1) {
      setChatShow(0);
      setIsClicked(0);
    } else {
      setIsClicked(1);
      setChatShow(1);
    }
  };

  return (
    <div className={`${styles.quick_menu} ${styles.on}`}>
      <div className={styles.quick_btn} onClick={() => showChat()}>
        <BiChat
          className={`${styles.msg_icon} ${isClicked && styles.icon_clicked} `}
        />
      </div>
      {chatShow == 1 && (
        <div className={styles.chat_box}>
          <div className={styles.chat_list}>
            <ChatItem />
          </div>
          <div className={styles.chat_area}>
            <Chatting />
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageModal;
