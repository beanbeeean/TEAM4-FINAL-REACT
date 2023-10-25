import React, { useEffect, useState } from "react";
import stylesAdmin from "../../css/reservation/StudyRoomSetting.module.css";
import StudyRoomSettingModal from "./StudyRoomSettingModal";

const StudyRoomSetting = () => {
  const [modalShow, setModalShow] = useState(false);
  const [roomName, setRoomName] = useState("");
  const showModal = (e) => {
    setRoomName(e.target.textContent);
    setModalShow(true);
  };
  return (
    <div className={stylesAdmin.sr_setting_wrap}>
      <div className={stylesAdmin.sr_item}>
        <img src="../imgs/space-4_3.jpeg" alt="" />
        <div className={stylesAdmin.sr_btn}>
          <div onClick={(e) => showModal(e)}>SPACE1-A</div>
          <div onClick={(e) => showModal(e)}>SPACE1-B</div>
        </div>
        <p>(2~4인실)</p>
      </div>
      <div className={stylesAdmin.sr_item}>
        <img src="../imgs/space-6_3.jpeg" alt="" />
        <div className={stylesAdmin.sr_btn}>
          <div onClick={(e) => showModal(e)}>SPACE2-A</div>
          <div onClick={(e) => showModal(e)}>SPACE2-B</div>
        </div>
        <p>(4~6인실)</p>
      </div>
      <div className={stylesAdmin.sr_item}>
        <img src="../imgs/space-8_3.jpeg" alt="" />
        <div className={stylesAdmin.sr_btn}>
          <div onClick={(e) => showModal(e)}>SPACE3-A</div>
          <div onClick={(e) => showModal(e)}>SPACE3-B</div>
        </div>
        <p>(6~8인실)</p>
      </div>
      <StudyRoomSettingModal
        show={modalShow}
        roomName={roomName}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default StudyRoomSetting;
