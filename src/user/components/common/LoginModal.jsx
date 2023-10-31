import React, { useState, useEffect } from 'react';
import '../../css/login/Login.css';
import { NAVER_AUTH_URL, KAKAO_AUTH_URL, GOOGLE_AUTH_URL, ACCESS_TOKEN, REFRESH_TOKEN } from './login';
import { login } from './login/APIUtils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { userLogin, userLogout } from '../../../redux/user/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function LoginModal(props) {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.error) {
            setTimeout(() => {
              alert(location.state.error);
              navigate.replace({
                    pathname: location.pathname,
                    state: {}
                });
            }, 100);
        }
    }, [location, navigate]);

    if (props.authenticated) {
        navigate("/", { state: { from: location } });
        return null;
    }

    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login-container">
              <div className="login-content">
                  
                  <h1 className="login-title">admin</h1>
                  <SocialLogin />
                  
                  <div className="or-separator">
                      <span className="or-text">OR</span>
                  </div>
                  
                  <h1 className="login-title">user</h1>
                  <LoginForm />
                  {/* <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span> */}
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
         <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}

function SocialLogin() {
    return (
        <div className="social-login">
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <img src="../imgs/google-logo.png" alt="Google" /> Sign in with Google</a>
            <a className="btn btn-block social-btn kakao" href={KAKAO_AUTH_URL}>
                <img src="../imgs/kakao-logo.png" alt="Kakao" /> Sign in with Kakao</a>
            <a className="btn btn-block social-btn kakao" href={NAVER_AUTH_URL}>
                <img src="../imgs/naver-logo.png" alt="Naver" /> Sign in with Naver</a>
        </div>
    );
}

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.flag);
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginRequest = { email, password };

        login(loginRequest)
            .then(response => {
                console.log(JSON.stringify(response, null, 2));
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                alert("로그인에 성공하였습니다.");
                dispatch(userLogin());
                navigate("/");
            }).catch(error => {
                alert((error && error.message) || '로그인에 실패하였습니다.');
                dispatch(userLogout());
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input type="email" name="email" 
                    className="form-control" placeholder="Email"
                    value={email} onChange={handleInputChange} required/>
            </div>
            <div className="form-item">
                <input type="password" name="password" 
                    className="form-control" placeholder="Password"
                    value={password} onChange={handleInputChange} required/>
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">Login</button>
            </div>
        </form>
    );
}

export default LoginModal;
