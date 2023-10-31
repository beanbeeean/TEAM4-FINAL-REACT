import React from "react";
import styles from "../../css/mypage/MypageProfile.module.css";
import { useSelector } from "react-redux";
import { userUpdate } from "../common/login/APIUtils";

const MypageProfile = () => {

  const user = useSelector((state) => state.user.userDto);
  
  const handleSubmit = () => {
    userUpdate("asd")
    .then(response => {
        alert("수정이 성공하였습니다.");
    }).catch(error => {
        alert((error && error.message) || '수정에 실패하였습니다.');
    });
  }

  return (
    <div className={styles.content_wrap}>
      <div className={styles.block}>
        <img className={styles.profile_img} src="../imgs/default_profile.png" />
        <br />
        <input className={styles.file} type="file" />
      </div>
      <div className={`${styles.block} ${styles.my_info}`}>
        <span className={styles.title}>별명 &emsp;&emsp;&emsp;</span>
        <input type="text" value={user.u_name} />
        <br />
        <span className={styles.title}>전화번호 &emsp;</span>
        <input type="text" value={user.u_phone} />
        <br />
        <span className={styles.title}>이메일 &emsp;&emsp;</span>
        <input type="mail" value={user.u_email} />
      </div>

      <div className={styles.btn_wrap}>
        <input type="button" onClick={() => handleSubmit()} value="적용" />
        <input type="button" value="취소" />
      </div>
    </div>
  );
};

export default MypageProfile;
