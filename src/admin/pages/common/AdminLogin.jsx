import React from "react";
import stylesAdmin from "../../css/common/AdminLogin.module.css";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const userLogin = () => {
    navigate("/admin/management");
  };
  return (
    <div className={stylesAdmin.admin_login_wrap}>
      <div className={stylesAdmin.login_container}>
        <form
          onSubmit={userLogin}
          name="login_form"
          className={stylesAdmin.login_form}
        >
          <img
            className={stylesAdmin.admin_logo}
            src="../imgs/admin_logo.png"
            alt=""
          />
          <h5>Sign in to your account.</h5>
          <input type="text" name="id" placeholder="ID" />
          <input
            type="password"
            name="password"
            placeholder="Passsword"
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
