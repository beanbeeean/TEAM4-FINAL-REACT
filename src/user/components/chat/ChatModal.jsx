import React, { useEffect, useState } from "react";
import styles from "../../css/chat/Chat.module.css";
import { BiChat } from "react-icons/bi";
import api from "../../../redux/api";
import ChatArea from "./ChatArea";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../redux/chat/slices/chatSlice";

const ChatModal = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [msg, setMsg] = useState([]);
  const [lastMsg, setLastMsg] = useState([]);
  // const [chatShow, setChatShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const dispatch = useDispatch();
  const { userDto } = useSelector((state) => state.user);
  let { storeChatRoomList, isClick, storeRoomId, storeRoomName, chatShow } =
    useSelector((state) => state.chat);

  const getList = () => {
    api
      .get("http://127.0.0.1:8090/chat/list", {
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

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    getList();
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

  useEffect(() => {
    // dispatch(chatActions.setLoading(true));
    // setRoomId("");
    // setRoomId(roomId);
    // lastMsg.splice(0, lastMsg.length);
    // msg.splice(0, msg.length);
    // setLastMsg([]);
    // setMsg([]);
  }, [roomId]);

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
                <div
                  className={`${styles.chat_list} ${
                    isVisible ? styles.cr_visible : styles.cr_hidden
                  }`}
                >
                  <h4 className={styles.chat_list_tit}>CHAT LIST</h4>
                  {storeChatRoomList.map((item) => (
                    <ChatItem
                      isVisible={isVisible}
                      setIsVisible={setIsVisible}
                      roomId={roomId}
                      setRoomId={setRoomId}
                      setRoomName={setRoomName}
                      item={item}
                    />
                  ))}
                </div>
                <div
                  className={`${styles.chat_area} ${
                    !isVisible ? styles.ca_visible : styles.ca_hidden
                  }`}
                >
                  <img src="../imgs/chat_logo.png" />
                  <button onClick={handleButtonClick}>dd</button>
                </div>
                {/* {roomId !== "" ? (
                  <ChatArea
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    user={userDto}
                    roomName={roomName}
                    getList={getList}
                  />
                ) : (
                  <div
                    className={`${styles.chat_area} ${
                      !isVisible ? styles.ca_visible : styles.ca_hidden
                    }`}
                  >
                    <img src="../imgs/chat_logo.png" />
                    <button onClick={handleButtonClick}>dd</button>
                  </div>
                )} */}
                {/* {roomId !== "" ? (
                  <ChatArea
                    // msg={msg}
                    // setMsg={setMsg}
                    // lastMsg={lastMsg}
                    // setLastMsg={setLastMsg}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    user={userDto}
                    roomName={roomName}
                    getList={getList}
                  />
                ) : (
                  <div className={styles.chat_area} isVisible ? styles.cr_visible : styles.cr_hidden>
                    <img src="../imgs/chat_logo.png" />
                    <button onClick={handleButtonClick}>dd</button>
                  </div>
                )} */}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatModal;
