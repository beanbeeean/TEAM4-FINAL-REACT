import React, { useState } from "react";
import styles from "./css/Profile.module.css";
import LoginModal from "../include/LoginModal";

const Profile = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={styles.my_info}>
      <div className={styles.my_info_content}>
        <img src="../imgs/default_profile.png" />
        <div className={styles.user_info}>
          <span className={styles.user_name}>이시영 님</span>
          <br />
          <span className={styles.user_mail}>tldud4346@gmail.com</span>
          <br />
          <span className={styles.user_point}>포인트: 1,592점</span>
        </div>
        {/* <div className={styles.notice}>
          Libooks를 더 안전하고 편리하게 이용하세요
        </div> */}
      </div>
      <div className={styles.btn_wrap}>
        <div className={styles.mypage_btn}>마이페이지</div>
        <div className={styles.log_btn}>로그아웃</div>
        {/* <div className={styles.log_btn} onClick={() => setModalShow(true)}>
          로그인
        </div> */}
        <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default Profile;
