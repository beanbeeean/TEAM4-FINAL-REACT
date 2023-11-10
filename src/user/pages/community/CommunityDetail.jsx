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

  const { communityDto } = useSelector((state) => state.community);
  console.log("communityDto :: ", communityDto);

  const [content, setContent] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [comment, setComment] = useState("");
  const [recomment, setRecomment] = useState("");

  const [userName, setUserName] = useState([]);

  const [userInput, setUserInput] = useState(false);

  const [reply, setReply] = useState([]);
  const [reReply, setReReply] = useState(false);
  const [secondReply, setSecondReply] = useState(false);

  const [modify, setModify] = useState(false);

  const [rNo, setRNo] = useState(0);
  const [reIdx, setReIdx] = useState();

  const { userDto, userDtos } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("userDtos :: ", userDtos);

  console.log("content :: ", content);
  console.log("userName : ", userName);

  useEffect(() => {
    axios
      .get(`/community/${id}`)
      .then((response) => {
        setContent(response.data);
        setUserName(
          userDtos.filter((e) => e.u_email === response.data.u_email)
        );
        console.log("res:::::", response.data);
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
  }, []);

  const deleteCommunity = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .post(`/community/delete${id}`)
        .then((response) => {
          setContent(response.data);
          alert("삭제가 완료되었습니다.");
          navigate(-1);
        })
        .catch((error) => console.log(error));
    }
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
        r_target_r_no: rNo,
      })
      .then((response) => {
        console.log(response.data);
        getComments();
        setReReply(false);
        setReIdx();
        setComment("");
        setUserInput(false);
      })
      .catch((error) => console.log(error));
  };

  const modify_comment = () => {
    axios
      .post(`/community/modify_comment`, {
        r_no: rNo,
        r_comment: comment,
      })
      .then((response) => {
        console.log(response.data);
        getComments();
        setReReply(false);
        setReIdx();
        setComment("");
        setModify(false);
      })
      .catch((error) => console.log(error));
  };

  const delete_comment = (no) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios
        .post(`/community/delete_comment`, {
          r_no: no,
        })
        .then((response) => {
          console.log(response.data);
          getComments();
          setReReply(false);
          setReIdx();
          setComment("");
          setModify(false);
        })
        .catch((error) => console.log(error));
    }
  };

  const getComments = () => {
    axios
      .get(`/community/get_comments`, {
        params: {
          c_no: id,
        },
      })
      .then((response) => {
        setReply(response.data.dtos);
        console.log("ddd", response.data.dtos);
      })
      .catch((error) => console.log(error));
  };

  const showReReply = (rNo, idx) => {
    setComment("");
    setReReply(true);
    setSecondReply(false);
    setRNo(rNo);
    setReIdx(idx);
    setModify(false);
    setUserInput(false);
  };

  const showSecondReply = (rNo, idx) => {
    setComment("");
    setSecondReply(true);
    setReReply(false);
    setRNo(rNo);
    setReIdx(idx);
    setModify(false);
    setUserInput(false);
  };

  const closeReRly = () => {
    setReReply(false);
    setReIdx();
    setComment("");
  };

  const showModify = (rNo, comment) => {
    setModify(true);
    setReReply(false);
    setSecondReply(false);
    setRNo(rNo);
    setComment(comment);
    setUserInput(false);
  };

  const hideAll = () => {
    setRNo(0);
    setReReply(false);
    setSecondReply(false);
    setModify(false);
    setUserInput(true);
  };

  useEffect(() => {
    getComments();
    console.log("userDtos :: ", userDtos);
  }, []);

  useEffect(() => {
    console.log("content :: ", content);
  }, [content]);

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("comment :: ", comment);
  }, [comment]);

  return (
    <div className={styles.section_wrap}>
      {content != null && (
        <div>
          <div className={styles.view_content}>
            <h1 className={styles.content_title}>{content.c_title}</h1>
            <span className={styles.user_name}>
              {userName[0].u_name}
            </span> |{" "}
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
              <img src={`${userDto.u_image}`} alt="" />
              {userInput ? (
                <div className={styles.user_input_area}>
                  <input
                    className={styles.input_comment}
                    type="text"
                    placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. :)"
                    onChange={(e) => setComment(e.target.value)}
                    onClick={() => setRNo(0)}
                  />
                  <div className={styles.user_input_btns}>
                    <button onClick={write_comment}>댓글</button>
                    <button onClick={() => setUserInput(false)}>취소</button>
                  </div>
                </div>
              ) : (
                <div className={styles.user_input_area}>
                  <div
                    className={styles.input_comment_unable}
                    onClick={() => hideAll()}
                  >
                    칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. :)
                  </div>
                </div>
              )}
            </div>
            <table className={styles.comment_wrap}>
              <tbody>
                {reply
                  .filter((e) => e.r_target_r_no == 0)
                  .map((item, idx) => (
                    <tr>
                      <td className={styles.comment_img}>
                        <img
                          src={
                            userDtos.filter((dto) => dto.u_no == item.u_no)[0]
                              .u_image
                          }
                          alt=""
                        />
                      </td>
                      <td className={styles.comment_content}>
                        <div className={styles.comment_user}>
                          {
                            userDtos.filter((dto) => dto.u_no == item.u_no)[0]
                              .u_name
                          }
                          <span className={styles.comment_date}>
                            {item.r_mod_date}
                          </span>
                        </div>

                        {modify && item.r_no == rNo ? (
                          <div className={styles.comment_text}>
                            <input
                              type="text"
                              className={styles.comment_modify}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <div className={styles.modify_comment_btns}>
                              <button onClick={modify_comment}>수정</button>
                              <button onClick={() => setModify(false)}>
                                취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.comment_text}>
                            {item.r_comment}
                          </div>
                        )}
                        {userDto.u_no == item.u_no ? (
                          <div className={styles.comment_btns}>
                            <span onClick={() => showReReply(item.r_no, idx)}>
                              답글달기
                            </span>
                            <span
                              onClick={() =>
                                showModify(item.r_no, item.r_comment)
                              }
                            >
                              수정하기
                            </span>
                            <span onClick={() => delete_comment(item.r_no)}>
                              삭제하기
                            </span>
                          </div>
                        ) : (
                          <div className={styles.comment_btns}>
                            <span onClick={() => showReReply(item.r_no, idx)}>
                              답글달기
                            </span>
                          </div>
                        )}
                        {reReply && idx == reIdx && (
                          <div className={styles.write_reply_wrap}>
                            <div className={styles.write_reply}>
                              <img src={userDto.u_image} alt="" />
                              <input
                                type="text"
                                placeholder="답글 추가.."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </div>
                            <div className={styles.write_reply_btns}>
                              <button onClick={write_comment}>답글</button>
                              <button onClick={closeReRly}>취소</button>
                            </div>
                          </div>
                        )}
                        {reply
                          .filter((e) => e.r_target_r_no == item.r_no)
                          .map((reply, repIdx) => (
                            <div className={styles.comment_reply_wrap}>
                              <div className={styles.comment_reply}>
                                <img
                                  src={
                                    userDtos.filter(
                                      (dto) => dto.u_no == reply.u_no
                                    )[0].u_image
                                  }
                                  alt=""
                                />
                                <div className={styles.reply_content}>
                                  <div className={styles.comment_user}>
                                    {
                                      userDtos.filter(
                                        (dto) => dto.u_no == reply.u_no
                                      )[0].u_name
                                    }
                                    <span className={styles.comment_date}>
                                      {reply.r_mod_date}
                                    </span>
                                  </div>

                                  {modify && reply.r_no == rNo ? (
                                    <div className={styles.comment_text}>
                                      <input
                                        type="text"
                                        className={styles.comment_modify}
                                        value={comment}
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                      />
                                      <div
                                        className={styles.modify_comment_btns}
                                      >
                                        <button onClick={modify_comment}>
                                          수정
                                        </button>
                                        <button
                                          onClick={() => setModify(false)}
                                        >
                                          취소
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className={styles.comment_text}>
                                      {reply.r_comment}
                                    </div>
                                  )}

                                  {userDto.u_no == reply.u_no ? (
                                    <div className={styles.comment_btns}>
                                      <span
                                        onClick={() =>
                                          showSecondReply(item.r_no, repIdx)
                                        }
                                      >
                                        답글달기
                                      </span>
                                      <span
                                        onClick={() =>
                                          showModify(
                                            reply.r_no,
                                            reply.r_comment
                                          )
                                        }
                                      >
                                        수정하기
                                      </span>
                                      <span
                                        onClick={() =>
                                          delete_comment(reply.r_no)
                                        }
                                      >
                                        삭제하기
                                      </span>
                                    </div>
                                  ) : (
                                    <div className={styles.comment_btns}>
                                      <span
                                        onClick={() =>
                                          showSecondReply(item.r_no, repIdx)
                                        }
                                      >
                                        답글달기
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {secondReply &&
                                repIdx == reIdx &&
                                rNo == item.r_no && (
                                  <div className={styles.write_reply_wrap}>
                                    <div className={styles.write_reply}>
                                      <img src={userDto.u_image} alt="" />
                                      <input
                                        type="text"
                                        placeholder="답글 추가.."
                                        value={comment}
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className={styles.write_reply_btns}>
                                      <button onClick={write_comment}>
                                        답글
                                      </button>
                                      <button onClick={closeReRly}>취소</button>
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityDetail;
