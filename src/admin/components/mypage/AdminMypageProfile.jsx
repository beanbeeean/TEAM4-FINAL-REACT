import React, { useState } from "react";
import stylesAdmin from "../../css/mypage/AdminMypageProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  userUpdate,
  userUpload,
} from "../../../user/components/common/login/APIUtils";
import { userLogin } from "../../../redux/user/slices/userSlice";

const AdminMypageProfile = () => {
  const loginedUser = useSelector((state) => state.user.userDto);
  console.log("loginedUser :: ", loginedUser);

  const [u_name, setU_name] = useState(loginedUser.u_name);
  const [u_phone, setU_phone] = useState(loginedUser.u_phone);
  const [u_email, setU_mail] = useState(loginedUser.u_email);
  const [file, setFile] = useState(loginedUser.u_image); //파일
  const [file2, setFile2] = useState(loginedUser.u_image); //파일

  const dispatch = useDispatch();

  const handleChangeFile = (event) => {
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
    const update = new FormData();
    Object.values(file).forEach((file) => update.append("file", file));

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
  }
  return (
    <div className={stylesAdmin.management_wrap}>
      <h2 className={stylesAdmin.admin_title}>MY PAGE</h2>
      <hr />
      <div className={stylesAdmin.content_wrap}>
        <div className={stylesAdmin.block}>
          {file2 == null || file2 == "" ? (
            <img
              className={stylesAdmin.profile_img}
              src="../imgs/admin_profile.png"
            />
          ) : (
            <img
              className={stylesAdmin.profile_img}
              src={file2}
              alt="Description"
            />
          )}
          <br />
          <input
            className={stylesAdmin.file}
            type="file"
            id="file"
            onChange={handleChangeFile}
            multiple="multiple"
          ></input>
        </div>
        <div className={`${stylesAdmin.block} ${stylesAdmin.my_info}`}>
          <span className={stylesAdmin.title}>별명 &emsp;&emsp;&emsp;</span>
          <input
            type="text"
            value={u_name}
            onChange={(e) => setU_name(e.target.value)}
          />
          <br />
          <span className={stylesAdmin.title}>전화번호 &emsp;</span>
          <input
            type="text"
            value={u_phone}
            onChange={(e) => setU_phone(e.target.value)}
          />
          <br />
          <span className={stylesAdmin.title}>이메일 &emsp;&emsp;</span>
          <input
            type="mail"
            value={u_email}
            onChange={(e) => setU_mail(e.target.value)}
          />
        </div>

        <div className={stylesAdmin.btn_wrap}>
          <input type="button" onClick={() => Send()} value="적용" />
          <input type="button" value="취소" />
        </div>
      </div>
    </div>
  );
};

export default AdminMypageProfile;
