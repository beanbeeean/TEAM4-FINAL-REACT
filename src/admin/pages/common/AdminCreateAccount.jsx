import React, { useState } from "react";
import stylesAdmin from "../../css/common/AdminCreateAccount.module.css";
import { Link } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";

const AdminCreateAccount = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = (password1, password2) => {
    if (password1 === password2) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  console.log("passwordMatch :: ", passwordMatch);

  return (
    <div className={stylesAdmin.admin_login_wrap}>
      <div className={stylesAdmin.login_container}>
        <form name="login_form" className={stylesAdmin.login_form}>
          <img
            className={stylesAdmin.admin_logo}
            src="../imgs/admin_logo.png"
            alt=""
          />
          <h5>Sign up</h5>
          <input type="text" name="id" placeholder="ID" />
          <input
            type="password"
            name="password1"
            placeholder="Passsword"
            id="pwd"
            onChange={(e) => setPassword1(e.target.value)}
          />
          <input
            type="password"
            name="password2"
            placeholder="Verify Passsword"
            id="pwd"
            onChange={(e) => {
              setPassword2(e.target.value);
              handleSubmit(password1, e.target.value);
            }}
          />

          {!passwordMatch && (
            <div className={stylesAdmin.error_message}>
              <PiWarningCircleFill style={{ color: "red" }} />
              &nbsp;Passwords do not match.
            </div>
          )}

          <input type="text" name="name" placeholder="Name" />

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
