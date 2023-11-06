import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css/community/CommunityDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import api from "../../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../redux/chat/slices/chatSlice";

const CommunityDetail = () => {
  let id = useParams().id;
  console.log("id : ", id);

  const [content, setContent] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [comment, setComment] = useState("");
  const [target, setTarget] = useState(0);
  const { userDto } = useSelector((state) => state.user);
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

  const write_comment = () => {
    axios
      .post(`/community/write_comment`, {
        c_no: id,
        u_no: userDto.u_no,
        r_comment: comment,
        r_target_r_no: target,
      })
      .then((response) => {
        console.log(response.data);
        getComments();
      })
      .catch((error) => console.log(error));
  };

  const getComments = () => {
    axios
      .get(`/community/get_comments`, {
        params: {
          c_no: id,
        },
      })
      .then((response) => {
        console.log("ddd", response.data.dtos);
      })
      .catch((error) => console.log(error));
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
              <img src="../imgs/logo.png" alt="" />
              <div className={styles.user_input_area}>
                <input
                  className={styles.input_comment}
                  type="text"
                  placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. :)"
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className={styles.user_input_btns}>
                  <button onClick={write_comment}>댓글</button>
                  <button>취소</button>
                </div>
              </div>
            </div>
            <table className={styles.comment_wrap}>
              <tbody>
                <tr>
                  <td className={styles.comment_img}>
                    <img src="../imgs/logo.png" alt="" />
                  </td>
                  <td>
                    <div className={styles.comment_user}>
                      홍재희
                      <span className={styles.comment_date}>
                        2023.11.06 00:02
                      </span>
                    </div>
                    <div className={styles.comment_text}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsam asperiores blanditiis libero veniam ad, soluta
                      corporis exercitationem obcaecati ab accusamus odit
                      tempore in nemo illo. Eius adipisci consequuntur dolores
                      veniam.
                    </div>
                    <div className={styles.comment_btns}>
                      <span>답글달기</span>
                      <span>수정하기</span>
                      <span>삭제하기</span>
                    </div>
                    <div className={styles.comment_reply_wrap}>
                      <div className={styles.comment_reply}>
                        <img src="./logo.png" alt="" />
                        <div className={styles.reply_content}>
                          <div className={styles.comment_user}>
                            홍재희
                            <span className={styles.comment_date}>
                              2023.11.06 00:02
                            </span>
                          </div>
                          <div className={styles.comment_text}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ipsam asperiores blanditiis libero veniam ad,
                            soluta corporis exercitationem obcaecati ab
                            accusamus odit tempore in nemo illo. Eius adipisci
                            consequuntur dolores veniam.
                          </div>
                          <input
                            type="text"
                            className={styles.comment_modify}
                            value="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsam asperiores blanditiis libero veniam ad, soluta
                      corporis exercitationem obcaecati ab accusamus odit
                      tempore in nemo illo. Eius adipisci consequuntur dolores
                      veniam."
                          />
                          <div className={styles.modify_comment_btns}>
                            <button>수정</button>
                            <button>취소</button>
                          </div>
                          <div className={styles.comment_btns}>
                            <span>답글달기</span>
                            <span>수정하기</span>
                            <span>삭제하기</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.write_reply_wrap}>
                      <div className={styles.write_reply}>
                        <img src="./logo.png" alt="" />
                        <input type="text" placeholder="답글 추가.." />
                      </div>
                      <div className={styles.write_reply_btns}>
                        <button>답글</button>
                        <button>취소</button>
                      </div>
                    </div>
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
