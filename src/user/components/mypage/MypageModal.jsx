import React, { useState } from "react";
import styles from "../../css/mypage/MypageModal.module.css";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ChatItem from "../common/chat/ChatItem";
import Chatting from "../common/chat/Chatting";

const MypageModal = () => {
  const [show, setShow] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [chatShow, setChatShow] = useState(0);
  const [isChatClicked, setIsChatClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (show == 1) {
      setShow(0);
      setIsClicked(false);
      setChatShow(0);
      setIsChatClicked(false);
    } else if (show == 2) {
      setShow(1);
      setIsClicked(true);
      setChatShow(0);
      setIsChatClicked(false);
    } else {
      setShow(1);
      setIsClicked(true);
      setChatShow(0);
      setIsChatClicked(false);
    }
  };

  const move = (num) => {
    navigate("/mypage", {
      state: {
        page: num,
      },
    });
  };

  const showChat = () => {
    console.log("showChat");
    setShow(2);
    setChatShow(1);
    setIsChatClicked(true);
  };

  return (
    <div className={`${styles.quick_menu} ${show == 1 && styles.on}`}>
      <div className={styles.quick_btn} onClick={handleClick}>
        <IoAdd
          className={`${styles.msg_icon} ${isClicked && styles.rotated}`}
        />
      </div>
      <div className={styles.profile_box}>
        <div className={styles.profile_wrap}>
          <img src="../imgs/default_profile.png" />
          <div onClick={() => move(1)}>이시영 님</div>
          <div className={styles.profile_mail}>tldud4346@gmail.com</div>
        </div>
        <div className={styles.mypage_menu}>
          <ul>
            <li onClick={() => move(2)} className={styles.menu}>
              RESERVATION
            </li>
            <li onClick={() => move(4)} className={styles.menu}>
              CONTENTS
            </li>
          </ul>
          <ul>
            <li onClick={() => move(3)} className={styles.menu}>
              MY BOOKS
            </li>

            <li onClick={() => showChat()} className={styles.menu}>
              MY CHAT
            </li>
          </ul>
        </div>
      </div>

      {show == 2 && (
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
