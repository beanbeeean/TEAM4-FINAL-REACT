import React, { useState } from "react";
import styles from "../../css/mypage/MypageProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { myDelete, userUpdate, userUpload } from "../common/login/APIUtils";
import { userLogin, userLogout } from "../../../redux/user/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const MypageProfile = () => {
  const user = useSelector((state) => state.user.userDto);
  const [u_name, setU_name] = useState(user.u_name);
  const [u_phone, setU_phone] = useState(user.u_phone);
  const [u_email, setU_mail] = useState(user.u_email);
  const [file, setFile] = useState(false); //파일
  const [file2, setFile2] = useState(user.u_image); //파일

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              Swal.fire({
                position: "center",
                icon: "success",
                title: "수정이 성공하였습니다.",
                iconColor: "#889aff",
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
            title: "수정이 성공하였습니다.",
            iconColor: "#889aff",
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
  }

  const deleteAccount = () => {
    Swal.fire({
      title: "계정을 탈퇴하시겠습니까?",
      text: "계정탈퇴 시 다시 되돌릴 수 없습니다.",
      icon: "warning",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#"#889aff", ', // confrim 버튼 색깔 지정
      cancelButtonColor: "#dadada", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        myDelete()
          .then((response) => {
            dispatch(userLogout());
            Swal.fire({
              position: "center",
              icon: "success",
              title: "회원 탈퇴 되었습니다.",
              iconColor: "#889aff",
              showConfirmButton: false,
              timer: 3000,
            });
            navigate("/");
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
        {/* <input
          className={styles.file}
          type="file"
          id="file"
          onChange={handleChangeFile}
          multiple="multiple"
        ></input> */}
        <div class={styles.filebox}>
          <label for="file">파일찾기</label>
          <input
            className={styles.upload_name}
            value={file2}
            placeholder="첨부파일"
            disabled
          />

          <input
            type="file"
            id="file"
            onChange={handleChangeFile}
            multiple="multiple"
          ></input>
        </div>
      </div>
      <div className={`${styles.block} ${styles.my_info}`}>
        <span className={styles.title}>이메일 &emsp;&emsp;</span>
        <input
          type="mail"
          value={u_email}
          readOnly
          disabled
          onChange={(e) => setU_mail(e.target.value)}
        />
        <br />
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
      </div>

      <div className={styles.btn_wrap}>
        <input type="button" onClick={() => Send()} value="적용" />
        <input type="button" value="취소" />
      </div>
      <div className={styles.btn_delete}>
        계정을 탈퇴하시겠습니까? <span onClick={deleteAccount}>계정탈퇴</span>
      </div>
    </div>
  );
};

export default MypageProfile;
