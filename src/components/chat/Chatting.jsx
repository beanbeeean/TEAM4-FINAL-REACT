import React from "react";
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
];
const Chatting = () => {
  return (
    <div className={styles.chatting}>
      {data.map((chat) =>
        chat.user == 1 ? <MyChat chat={chat} /> : <OthersChat chat={chat} />
      )}
    </div>
  );
};

export default Chatting;
