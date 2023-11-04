import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import styles from "../../css/community/CommunityWrite.module.css";

const RowBox = styled.div`
  width: 100%;
  display: flex;
`;

const Viewer = styled.div`
  width: calc(50% - 40px);
  height: 400px;
  padding: 20px;
  margin-top: 20px;
  border: 2px solid gray;
`;

const CommunityWrite = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");
  const [selection, setSelection] = useState(1);
  const [title, setTitle] = useState("");

  const [newName, setNewName] = useState("");
  const [userMaxCount, setUserMaxCount] = useState(2);

  const navigate = useNavigate();

  const { userDto } = useSelector((state) => state.user);
  console.log("userDto : ", userDto.u_email);

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  const handleSubmit = () => {
    axios
      .get(`/community/write`, {
        params: {
          selection: selection,
          title: title,
          content: htmlString,
          u_email: userDto.u_email,
        },
      })
      .then((response) => {
        console.log("글 작성 성공", response.data);
        alert("작성이 완료되었습니다.");
        navigate(-1);
      })
      .catch((error) => {
        console.error("글 작성 실패", error);
      });
  };

  // const createRoom = () => {
  //   api
  //     .post("http://127.0.0.1:8090/chat/createroom", {
  //       newName: newName,
  //       userMaxCount: userMaxCount,
  //       userName: userName,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       getList();
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    console.log("여기입니다.", userDto);
  }, []);

  return (
    <>
      <div className={styles.write_btns}>
        <button onClick={handleSubmit}>등록</button>
        <button>취소</button>
      </div>
      <div className={styles.write_title}>
        <h4>제목</h4>
        <select
          className={styles.wrtie_select_category}
          name="write_category"
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value="1">자유</option>
          <option value="2">도서추천</option>
          <option value="3">스터디원 모집</option>
        </select>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.editor_wrap}>
        <Editor
          placeholder="게시글을 작성해주세요"
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          toolbar={{
            image: { uploadCallback: uploadCallback },
          }}
          localization={{ locale: "ko" }}
          editorStyle={{
            height: "400px",
            width: "100%",
            border: "none",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        />
      </div>

      {selection == 3 ? (
        <div className={styles.create_wrap}>
          <h4>채팅방 개설</h4>
          <div className={styles.create_input}>
            방 이름
            <input
              type="text"
              name="name"
              placeholder="채팅방 이름을 입력해주세요"
              onChange={(e) => setNewName(e.target.value)}
            />
            <input type="button" value={"중복체크"} />
            최대 인원
            <input
              type="number"
              value={userMaxCount}
              min={2}
              max={10}
              onChange={(e) => setUserMaxCount(e.target.value)}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CommunityWrite;
