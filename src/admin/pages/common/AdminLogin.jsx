import React, { useState } from "react";
import stylesAdmin from "../../css/common/AdminLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../user/components/common/login/APIUtils";
import { ACCESS_TOKEN } from "../../../user/components/common/login";
import { useDispatch } from "react-redux";
import { userLogin, userLogout } from "../../../redux/user/slices/userSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginRequest = { email, password };

    login(loginRequest)
      .then((response) => {
        console.log(JSON.stringify(response, null, 2));
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        alert("로그인에 성공하였습니다.");
        dispatch(userLogin());
        navigate("/admin/management");
      })
      .catch((error) => {
        alert((error && error.message) || "로그인에 실패하였습니다.");
        dispatch(userLogout());
      });
  };

  return (
    <div className={stylesAdmin.admin_login_wrap}>
      <div className={stylesAdmin.login_container}>
        <form
          onSubmit={handleSubmit}
          name="login_form"
          className={stylesAdmin.login_form}
        >
          <img
            className={stylesAdmin.admin_logo}
            src="../imgs/admin_logo.png"
            alt=""
          />
          <h5>Sign in to your account.</h5>
          <input
            type="text"
            name="email"
            placeholder="ID"
            value={email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Passsword"
            value={password}
            onChange={handleInputChange}
            required
            id="pwd"
          />

          <input
            type="submit"
            value="Sign in"
            className={stylesAdmin.sign_in_btn}
          />
        </form>
        <Link
          to={"/admin/create_account"}
          className={stylesAdmin.go_create_account}
        >
          Don’t have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
