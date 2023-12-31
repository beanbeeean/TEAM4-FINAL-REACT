import React, { useState } from "react";
import stylesAdmin from "../../css/mypage/AdminMypageProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  myDelete,
  userUpdate,
  userUpload,
} from "../../../user/components/common/login/APIUtils";
import { userLogin } from "../../../redux/user/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const AdminMypageProfile = () => {
  const loginedUser = useSelector((state) => state.user.userDto);
  console.log("loginedUser :: ", loginedUser);

  const [u_name, setU_name] = useState(loginedUser.u_name);
  const [u_phone, setU_phone] = useState(loginedUser.u_phone);
  const [u_email, setU_mail] = useState(loginedUser.u_email);
  const [file, setFile] = useState(false); //파일
  const [file2, setFile2] = useState(loginedUser.u_image); //파일

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const Send = () => {
    if (file) {
      const update = new FormData();
      Object.values(file).forEach((file) => update.append("file", file));

      userUpload(update)
        .then((response) => {
          userUpdate({ u_name, u_phone, u_email })
            .then((response) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "수정에 성공하였습니다.",
                iconColor: "rgb(33, 41, 66)",
                showConfirmButton: false,
                timer: 3000,
              });
              dispatch(userLogin(response.data));
            })
            .catch((error) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "수정에 실패하였습니다.",
                showConfirmButton: false,
                timer: 3000,
              });
            });
        })
        .catch((error) => {});
    } else {
      userUpdate({ u_name, u_phone, u_email })
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "수정에 성공하였습니다.",
            iconColor: "rgb(33, 41, 66)",
            showConfirmButton: false,
            timer: 3000,
          });
          dispatch(userLogin(response.data));
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "수정에 실패하였습니다.",
            showConfirmButton: false,
            timer: 3000,
          });
        });
    }
  };

  const deleteAccount = () => {
    Swal.fire({
      title: "계정을 탈퇴하시겠습니까?",
      text: "계정 탈퇴 시 다시 되돌릴 수 없습니다.",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "rgb(33, 41, 66)",
      cancelButtonColor: "#dadada",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        myDelete()
          .then((response) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "회원 탈퇴에 성공하였습니다.",
              iconColor: "rgb(33, 41, 66)",
              showConfirmButton: false,
              timer: 3000,
            });
            dispatch(userLogin());
            navigate("/admin/login");
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "회원 탈퇴에 실패하였습니다.",
              showConfirmButton: false,
              timer: 3000,
            });
          });
      }
    });
  };

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
          <span className={stylesAdmin.title}>이메일 &emsp;&emsp;</span>
          <input type="mail" value={u_email} readOnly disabled />
          <br />
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
        </div>

        <div className={stylesAdmin.btn_wrap}>
          <input type="button" onClick={() => Send()} value="적용" />
          <input type="button" value="취소" />
        </div>
        <div className={stylesAdmin.btn_delete}>
          계정을 탈퇴하시겠습니까? <span onClick={deleteAccount}>계정탈퇴</span>
        </div>
      </div>
    </div>
  );
};

export default AdminMypageProfile;
