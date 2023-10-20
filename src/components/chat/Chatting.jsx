import React, { useEffect, useRef } from "react";
import styles from "./css/Chatting.module.css";
import MyChat from "./MyChat";
import OthersChat from "./OthersChat";

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
    scrollToBottom();
  }, []);
  return (
    <div ref={scrollRef} className={styles.chatting}>
      {data.map((chat) =>
        chat.user == 1 ? <MyChat chat={chat} /> : <OthersChat chat={chat} />
      )}
      <div className={styles.input_chat}>
        <input type="text" />
      </div>
    </div>
  );
};

export default Chatting;
