import React, { useState } from "react";
import styles from "../../css/mypage/MypageModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { BsPersonVcard } from "react-icons/bs";

const MypageModal = () => {
  const [show, setShow] = useState(false);
  return (
    <div className={`${styles.quick_menu} ${show == true && styles.on}`}>
      <div className={styles.profile_box}>
        <div className={styles.profile_list}>
          <h4>MY PROFILE</h4>
        </div>
        <div className={styles.profile_area}></div>
      </div>
      <div className={styles.quick_btn} onClick={() => setShow(!show)}>
        <BsPersonVcard className={styles.msg_icon} icon={faMessage} />
        <p>My Profile</p>
      </div>
    </div>
  );
};

export default MypageModal;
