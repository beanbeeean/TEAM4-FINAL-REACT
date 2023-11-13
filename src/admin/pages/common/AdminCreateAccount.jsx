import React, { useState } from "react";
import stylesAdmin from "../../css/common/AdminCreateAccount.module.css";
import { Link, useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";
import { ACCESS_TOKEN } from "../../../user/components/common/login";
import { signup } from "../../../user/components/common/login/APIUtils";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const AdminCreateAccount = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  const checkPwd = (password, password2) => {
    if (password === password2) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const signupRequest = { name, password, email };

    signup(signupRequest)
      .then((response) => {
        console.log(JSON.stringify(response, null, 2));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "회원가입에 성공하였습니다.",
          iconColor: "rgb(33, 41, 66)",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/admin/login");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "회원가입에 실패하였습니다.",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  console.log("passwordMatch :: ", passwordMatch);

  return (
    <div className={stylesAdmin.admin_login_wrap}>
      <div className={stylesAdmin.login_container}>
        <form
          name="login_form"
          className={stylesAdmin.login_form}
          onSubmit={handleSubmit}
        >
          <img
            className={stylesAdmin.admin_logo}
            src="../imgs/admin_logo.png"
            alt=""
          />
          <h5>Sign up</h5>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Passsword"
            id="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password2"
            placeholder="Verify Passsword"
            id="pwd"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
              checkPwd(password, e.target.value);
            }}
          />

          {!passwordMatch && (
            <div className={stylesAdmin.error_message}>
              <PiWarningCircleFill style={{ color: "red" }} />
              &nbsp;Passwords do not match.
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="submit"
            value="Sign up"
            className={stylesAdmin.sign_in_btn}
          />
        </form>
        <Link to={"/admin/login"} className={stylesAdmin.go_create_account}>
          Do you already have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default AdminCreateAccount;
