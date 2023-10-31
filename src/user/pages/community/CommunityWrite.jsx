import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  return (
    <>
      <Container>
        <select
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
        {selection == 3 && <div>채팅방 개설</div>}
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
            border: "3px solid lightgray",
            padding: "20px",
          }}
        />
        <div>
          <button onClick={handleSubmit}>작성</button>
          <button>초기화</button>
        </div>
      </Container>
      <RowBox>
        <Viewer dangerouslySetInnerHTML={{ __html: htmlString }} />
        <Viewer>{htmlString}</Viewer>
      </RowBox>
    </>
  );
};

export default CommunityWrite;