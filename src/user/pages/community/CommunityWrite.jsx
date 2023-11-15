import React, { useEffect, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/community/CommunityWrite.module.css";
import api from "../../../redux/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { chatActions } from "../../../redux/chat/slices/chatSlice";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

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

const CommunityWrite = () => {
  const [htmlString, setHtmlString] = useState("");
  const [selection, setSelection] = useState(1);
  const [title, setTitle] = useState("");

  const [newName, setNewName] = useState("");
  const [userMaxCount, setUserMaxCount] = useState(2);
  const [enable, setEnable] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quillValue, setQuillValue] = useState("");

  const { userDto } = useSelector((state) => state.user);

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
    console.log("editor.getContents() :: ", editor.getContents());
    setQuillValue(editor.getContents());
    setHtmlString(content);
  };

  useEffect(() => {
    console.log("여기입니다.", userDto);
  }, []);

  const handleSubmit = () => {
    if (selection == 3) {
      if (title.trim() == "") {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "제목을 입력해주세요.",
          iconColor: "yellow",
          showConfirmButton: true,
          timer: 3000,
        });
      } else if (enable != 0) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "채팅방 이름 중복 체크를 해주세요.",
          iconColor: "yellow",
          showConfirmButton: true,
          timer: 3000,
        });
      } else {
        console.log("같이 쓰기", htmlString);
        axios
          .post(`/community/write`, {
            selection: selection,
            title: title,
            content: htmlString,
            u_email: userDto.u_email,
            // u_name: userDto.u_name,
          })
          .then((response) => {
            console.log("글 작성 성공", response.data);
            createRoom(response.data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "작성이 완료되었습니다.",
              iconColor: "#889aff",
              showConfirmButton: false,
              timer: 3000,
            });
            navigate(-1);
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "글 작성에 실패하였습니다.",
              showConfirmButton: false,
              timer: 3000,
            });
          });
      }
    } else {
      if (title.trim() == "") {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "제목을 입력해주세요.",
          iconColor: "yellow",
          showConfirmButton: true,
          timer: 3000,
        });
      } else {
        console.log("글만 쓰기", htmlString);
        axios
          .post(`/community/write`, {
            selection: selection,
            title: title,
            content: htmlString,
            u_email: userDto.u_email,
            // u_name: userDto.u_name,
          })
          .then((response) => {
            console.log("글 작성 성공", response.data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "작성이 완료되었습니다.",
              iconColor: "#889aff",
              showConfirmButton: false,
              timer: 3000,
            });
            navigate(-1);
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "글 작성에 실패하였습니다.",
              showConfirmButton: false,
              timer: 3000,
            });
          });
      }
    }
  };

  const getList = () => {
    api
      .get("http://127.0.0.1:8080/chat/list", {
        params: {
          user: userDto.u_email,
        },
      })
      .then(function (res) {
        dispatch(chatActions.getChatRoomList(res.data.list));
      })
      .catch(function (err) {
        console.log("list err", err);
      });
  };

  const createRoom = (cNo) => {
    console.log("cNO ", cNo);
    api
      .post("http://127.0.0.1:8080/chat/createroom", {
        newName: newName,
        userMaxCount: userMaxCount,
        userMail: userDto.u_email,
        userName: userDto.u_name,
        cNo: cNo,
      })
      .then(function (response) {
        console.log(response);
        getList();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const isDuplicate = () => {
    api
      .post("http://127.0.0.1:8080/chat/duplicate", {
        newName: newName,
      })
      .then(function (response) {
        console.log("중복체크", response.data);
        setEnable(response.data.isDuplicate);
        // getList();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.write_btns}>
        <button onClick={handleSubmit}>등록</button>
        <button onClick={() => navigate("/community")}>취소</button>
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
        <ReactQuill
          style={{ height: "600px" }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={quillValue || ""}
          onChange={handleQuillChange}
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
            {enable == 0 ? (
              <span
                className={`${styles.duplicate_txt} ${styles.duplicate_txt_enable}`}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
                &nbsp;생성이 가능한 방 이름입니다.
              </span>
            ) : enable == 1 ? (
              <span
                className={`${styles.duplicate_txt} ${styles.duplicate_txt_disable}`}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
                &nbsp; 이름이 중복된 방이 있습니다.
              </span>
            ) : (
              enable == -1 && (
                <span
                  className={`${styles.duplicate_txt} ${styles.duplicate_txt_disable}`}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                  &nbsp; 공백만으로는 생성이 불가능합니다.
                </span>
              )
            )}
            <input type="button" value={"중복체크"} onClick={isDuplicate} />
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
