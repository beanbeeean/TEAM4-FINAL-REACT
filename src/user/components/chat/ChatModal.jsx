import React, { useEffect, useState } from "react";
import styles from "../../css/chat/Chat.module.css";
import { BiChat } from "react-icons/bi";

import ChatArea from "./ChatArea";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../redux/chat/slices/chatSlice";
import { userChatList } from "../common/login/APIUtils";

const ChatModal = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");

  // const [chatShow, setChatShow] = useState(0);
  // const [newName, setNewName] = useState("");
  // const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const { userDto } = useSelector((state) => state.user);
  let { storeChatRoomList, isClick, storeRoomId, storeRoomName } = useSelector(
    (state) => state.chat
  );

  const getList = () => {
    userChatList({
      params: {
        user: userDto.u_email,
      },
    })
      .then(function (res) {
        dispatch(chatActions.getChatRoomList(res.data.list));
        console.log("dsdsdsds", res.data.list);
      })
      .catch(function (err) {
        console.log("list err", err);
      });
  };

  useEffect(() => {
    if (JSON.stringify(userDto) != JSON.stringify({})) {
      getList();
      console.log("참 실행");
    }
    console.log("userDto  ", userDto);
  }, [userDto]);

  useEffect(() => {
    if (isClicked) {
      getList();
    }
    setIsClicked(isClick);
  }, [isClick]);

  useEffect(() => {
    setRoomId(storeRoomId);
    setRoomName(storeRoomName);
  }, [storeRoomId]);

  // useEffect(() => {
  //   setRoomId("");
  //   setRoomId(roomId);
  // }, [roomId]);

  return (
    <>
      {userDto.u_no && (
        <div className={`${styles.quick_menu} ${styles.on}`}>
          <div
            className={styles.quick_btn}
            // onClick={() => setIsClicked(!isClicked)}
            onClick={() => dispatch(chatActions.clickToggle(!isClicked))}
          >
            <BiChat
              className={`${styles.msg_icon} ${
                isClicked && styles.icon_clicked
              } `}
            />
          </div>
          {isClicked && (
            <>
              <div className={styles.chat_box}>
                <div className={styles.chat_list}>
                  <h4 className={styles.chat_list_tit}>CHAT LIST</h4>
                  {storeChatRoomList.map((item) => (
                    <ChatItem
                      roomId={roomId}
                      setRoomId={setRoomId}
                      setRoomName={setRoomName}
                      item={item}
                    />
                  ))}
                </div>

                {roomId !== "" ? (
                  <ChatArea
                    roomId={roomId}
                    setRoomId={setRoomId}
                    user={userDto}
                    roomName={roomName}
                    getList={getList}
                  />
                ) : (
                  <div className={styles.chat_area}>
                    <img src="../imgs/chat_logo.png" />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatModal;
