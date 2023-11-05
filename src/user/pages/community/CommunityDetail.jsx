import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css/community/CommunityDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { chatActions } from "../../../redux/chat/slices/chatSlice";

const CommunityDetail = () => {
  let id = useParams().id;
  console.log("id : ", id);

  const [content, setContent] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/community/${id}`)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => console.log(error));

    api
      .get("http://127.0.0.1:8090/chat/room_cno", {
        params: {
          cNo: id,
        },
      })
      .then(function (res) {
        setChatRoom(res.data.room);
        console.log("dsdsdsds", res.data.room);
      })
      .catch(function (err) {
        console.log(" err", err);
      });
  }, [id]);

  const deleteCommunity = () => {
    axios
      .post(`/community/delete${id}`)
      .then((response) => {
        setContent(response.data);
        alert("삭제가 완료되었습니다.");
        navigate(-1);
      })
      .catch((error) => console.log(error));
  };

  const showChatHandler = () => {
    dispatch(chatActions.clickToggle(true));
    dispatch(
      chatActions.getRoomId({ id: chatRoom.roomId, name: chatRoom.roomName })
    );
  };

  useEffect(() => {
    console.log("content :: ", content);
  }, [content]);

  return (
    <div className={styles.section_wrap}>
      {content != null && (
        <div>
          <div className={styles.view_content}>
            <h1 className={styles.content_title}>{content.c_title}</h1>
            <span className={styles.user_name}>{content.u_no}</span> |{" "}
            <span className={styles.content_reg_date}>
              {content.c_reg_date}
            </span>
            <span className={styles.modify_delete}>
              <span>
                <a className={styles.delete_btn} onClick={deleteCommunity}>
                  삭제하기
                </a>
              </span>
              <span>&nbsp;|&nbsp;</span>
              <span>
                <Link to={`/community_modify/${id}`}>수정하기</Link>
              </span>
            </span>
            <span className={styles.modify_delete}></span>
            <div
              className={styles.content_area}
              dangerouslySetInnerHTML={{ __html: content.c_content }}
            ></div>
            {content.c_category == 3 && (
              <div className={styles.chat_enter_card}>
                <div className={styles.ce_card}>
                  <div className={styles.ce_img}>
                    <img src="../imgs/chat_logo.png" alt="" />
                  </div>
                  <div className={styles.ce_card_info}>
                    <p className={styles.ce_title}>{chatRoom.roomName}</p>
                    <div className={styles.ce_user_count}>
                      <FontAwesomeIcon
                        className={`${
                          chatRoom.userCount == chatRoom.userMaxCount
                            ? styles.can_not_join
                            : styles.can_join
                        }`}
                        icon={faUser}
                      />
                      {chatRoom.userCount} / {chatRoom.userMaxCount}명
                    </div>
                    {/* <button className={styles.ce_button}>참여하기</button> */}
                    <button
                      className={styles.ce_button}
                      onClick={() => showChatHandler()}
                    >
                      채팅방 입장하기
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.hit_wrap}>
              <span>조회 수 </span>
              <span className={styles.hit_num}>{content.c_hit}</span>
            </div>
          </div>
          <div className={styles.comment_wrap}>
            <hr />
            <p>댓글</p>
            <div className={styles.user_input}>
              <input
                className={styles.input_comment}
                type="text"
                placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. :)"
              />
              <input
                type="button"
                className={styles.submitBtn}
                value="입력"
                // onclick={registReply}
              />
            </div>
            <div className={styles.user_input}>
              <input
                type="text"
                placeholder="로그인 후 이용가능한 서비스입니다. :)"
                readonly
              />
              <input type="button" value="입력" disabled />
            </div>

            <table className={styles.comments}>
              <tbody>
                <tr>
                  <td className={styles.comments_img}>
                    <img src="../imgs/kakao-logo.png" alt="" />
                  </td>
                  <td>
                    <div>유저이름</div>
                    <div>ㅇㄴㅇㄴㅇ</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityDetail;
