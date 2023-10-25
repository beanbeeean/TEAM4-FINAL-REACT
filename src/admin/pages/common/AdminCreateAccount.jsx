import React from "react";
import stylesAdmin from "../../css/common/AdminCreateAccount.module.css";
import { Link } from "react-router-dom";

const AdminCreateAccount = () => {
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
            name="password"
            placeholder="Passsword"
            id="pwd"
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
