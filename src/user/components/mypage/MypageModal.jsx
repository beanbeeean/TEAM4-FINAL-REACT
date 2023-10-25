import React, { useState } from "react";
import styles from "../../css/mypage/MypageModal.module.css";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MypageModal = () => {
  const [show, setShow] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
    setIsClicked(!isClicked);
  };

  const move = (num) => {
    navigate("/mypage", {
      state: {
        page: num,
      },
    });
  };

  return (
    <div className={`${styles.quick_menu} ${show == true && styles.on}`}>
      <div className={styles.quick_btn} onClick={handleClick}>
        <IoAdd
          className={`${styles.msg_icon} ${isClicked && styles.rotated}`}
          icon={faMessage}
        />
      </div>
      <div className={styles.profile_box}>
        <div className={styles.profile_wrap}>
          <img src="../imgs/default_profile.png" />
          <div onClick={() => move(1)}>이시영 님</div>
          <div className={styles.profile_mail}>tldud4346@gmail.com</div>
        </div>
        <div className={styles.mypage_menu}>
          <ul>
            <li onClick={() => move(2)} className={styles.menu}>
              RESERVATION
            </li>
            <li onClick={() => move(3)} className={styles.menu}>
              MY BOOKS
            </li>
          </ul>
          <ul>
            <li onClick={() => move(4)} className={styles.menu}>
              CONTENTS
            </li>
            <li onClick={() => move(5)} className={styles.menu}>
              MY CHAT
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MypageModal;
