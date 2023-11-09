import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import htmlToDraft from "html-to-draftjs";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
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

Quill.register("modules/imageResize", ImageResize);

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

const CommunityModify = () => {
  const { communityDto } = useSelector((state) => state.community);
  console.log("communityDto :: ", communityDto);

  let id = useParams().id;
  console.log("id : ", id);

  const modifyCommunity = communityDto.communityDtos.filter(
    (e) => e.c_no === id * 1
  );
  console.log("modifyCommunity :: ", modifyCommunity);

  const [htmlString, setHtmlString] = useState(modifyCommunity[0].c_content);
  // console.log("htmlString :: ", htmlString);
  const [selection, setSelection] = useState(1);

  const navigate = useNavigate();
  const [quillValue, setQuillValue] = useState("");

  const [title, setTitle] = useState(modifyCommunity[0].c_title);
  // const [content, setContent] = useState(modifyCommunity[0].c_content);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],

    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const handleQuillChange = (content, delta, source, editor) => {
    console.log("content :: ", content);
    // console.log("editor.getContents() :: ", editor.getContents());
    // setQuillValue(editor.getContents());
    setHtmlString(content);
  };

  const handleSubmit = () => {
    axios
      .post(`/community/community_modify/${id}`, {
        selection: selection,
        title: title,
        content: htmlString,
      })
      .then((response) => {
        console.log("수정 성공", response.data);
        alert("수정이 완료되었습니다.");
        navigate(-1);
      })
      .catch((error) => {
        console.error("수정 실패", error);
      });
  };

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  return (
    <>
      <div className={styles.write_btns}>
        <button onClick={handleSubmit}>수정</button>
        <button>초기화</button>
      </div>
      <div className={styles.write_title}>
        <h4>제목</h4>
        <select
          name="write_category"
          className={styles.wrtie_select_category}
          value={modifyCommunity[0].c_category}
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
        {selection == 3 && <div>채팅방 개설</div>}
        <ReactQuill
          style={{ height: "600px" }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={htmlString}
          // defaultValue={htmlString}
          onChange={handleQuillChange}
        />
      </div>
    </>
  );
};

export default CommunityModify;
