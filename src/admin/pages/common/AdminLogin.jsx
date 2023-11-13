import React, { useState } from "react";
import stylesAdmin from "../../css/common/AdminLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login, myPage } from "../../../user/components/common/login/APIUtils";
import { ACCESS_TOKEN } from "../../../user/components/common/login";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../../../redux/user/slices/userSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.flag);
  const dispatch = useDispatch();

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
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        alert("로그인에 성공하였습니다.");
        // dispatch(userLogin(response.data));
        myPage()
          .then((response) => {
            console.log("response.data", response.data);
            dispatch(userLogin(response.data));
          })
          .catch((error) => {
            alert((error && error.message) || "로그인에 실패하였습니다.");
            dispatch(userLogout());
          });
        navigate("/admin/management");
      })
      .catch((error) => {
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
            type="email"
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
            id="pwd"
            value={password}
            onChange={handleInputChange}
            required
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
