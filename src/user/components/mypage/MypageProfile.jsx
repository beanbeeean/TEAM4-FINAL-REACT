import React, { useState } from "react";
import styles from "../../css/mypage/MypageProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate, userUpload } from "../common/login/APIUtils";
import { userLogin } from "../../../redux/user/slices/userSlice";
import axios from "axios";

const MypageProfile = () => {
  const user = useSelector((state) => state.user.userDto);
  const [u_name, setU_name] = useState(user.u_name);
  const [u_phone, setU_phone] = useState(user.u_phone);
  const [u_email, setU_mail] = useState(user.u_email);
  const [file, setFile] = useState(false); //파일
  const [file2, setFile2] = useState(user.u_image); //파일

  const dispatch = useDispatch();

  const handleChangeFile = (event) => {
    console.log("event :: ", event);
    setFile(event.target.files);
    const img = event.target.files[0];
    if (img) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile2(reader.result);
      };

      reader.readAsDataURL(img);
    }
  };

  function Send() {
    if (file) {
      const update = new FormData();
      Object.values(file).forEach((file) => update.append("file", file));
      console.log("user file ", file);
      userUpload(update)
        .then((response) => {
          userUpdate({ u_name, u_phone, u_email })
            .then((response) => {
              alert("수정이 성공하였습니다.");
              dispatch(userLogin(response.data));
            })
            .catch((error) => {
              alert((error && error.message) || "수정에 실패하였습니다.");
            });
        })
        .catch((error) => {});
    } else {
      userUpdate({ u_name, u_phone, u_email })
        .then((response) => {
          alert("수정이 성공하였습니다.");
          dispatch(userLogin(response.data));
        })
        .catch((error) => {
          alert((error && error.message) || "수정에 실패하였습니다.");
        });
    }
  }
  return (
    <div className={styles.content_wrap}>
      <div className={styles.block}>
        {file2 == null || file2 == "" ? (
          <img
            className={styles.profile_img}
            src="../imgs/default_profile.png"
          />
        ) : (
          <img className={styles.profile_img} src={file2} alt="Description" />
        )}
        <br />
        <input
          className={styles.file}
          type="file"
          id="file"
          onChange={handleChangeFile}
          multiple="multiple"
        ></input>
      </div>
      <div className={`${styles.block} ${styles.my_info}`}>
        <span className={styles.title}>별명 &emsp;&emsp;&emsp;</span>
        <input
          type="text"
          value={u_name}
          onChange={(e) => setU_name(e.target.value)}
        />
        <br />
        <span className={styles.title}>전화번호 &emsp;</span>
        <input
          type="text"
          value={u_phone}
          onChange={(e) => setU_phone(e.target.value)}
        />
        <br />
        <span className={styles.title}>이메일 &emsp;&emsp;</span>
        <input
          type="mail"
          value={u_email}
          onChange={(e) => setU_mail(e.target.value)}
        />
      </div>

      <div className={styles.btn_wrap}>
        <input type="button" onClick={() => Send()} value="적용" />
        <input type="button" value="취소" />
      </div>
    </div>
  );
};

export default MypageProfile;
