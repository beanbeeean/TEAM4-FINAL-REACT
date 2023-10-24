import React from "react";
import styles from "../../css/common/MypageProfile.module.css";

const MypageProfile = () => {
  return (
    <div className={styles.content_wrap}>
      <div className={styles.block}>
        <img className={styles.profile_img} src="../imgs/default_profile.png" />
        <br />
        <input className={styles.file} type="file" />
      </div>
      <div className={`${styles.block} ${styles.my_info}`}>
        <span className={styles.title}>별명 &emsp;&emsp;&emsp;</span>
        <input type="text" value="이시영" />
        <br />
        <span className={styles.title}>전화번호 &emsp;</span>
        <input type="text" value="010-1234-5678" />
        <br />
        <span className={styles.title}>이메일 &emsp;&emsp;</span>
        <input type="mail" value="aaa@gmail.com" />
      </div>

      <div className={styles.btn_wrap}>
        <input type="button" value="적용" />
        <input type="button" value="취소" />
      </div>
    </div>
  );
};

export default MypageProfile;
