import React, { useEffect, useRef } from "react";
import styles from "./css/Chatting.module.css";
import MyChat from "./MyChat";
import OthersChat from "./OthersChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const data = [
  {
    user: 1,
    text: "hello",
  },
  {
    user: 2,
    text: "hi",
  },
  {
    user: 2,
    text: "nice to meet you",
  },
  {
    user: 1,
    text: "yeah",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
  {
    user: 2,
    text: "good",
  },
];
const Chatting = () => {
  const scrollRef = useRef();
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    // scrollToBottom();
  }, []);
  return (
    <div className={styles.chatting}>
      <div ref={scrollRef} className={styles.chatting_log}>
        <div className={styles.chat_date}>
          <span>2023년 10월 20일</span>
        </div>
        {data.map((chat) =>
          chat.user == 1 ? <MyChat chat={chat} /> : <OthersChat chat={chat} />
        )}
      </div>

      <div className={styles.input_chat}>
        <input type="text" placeholder="메세지를 입력하세요" />
        <FontAwesomeIcon
          title="Send"
          className={styles.send_icon}
          icon={faPaperPlane}
        />
      </div>
    </div>
  );
};

export default Chatting;
