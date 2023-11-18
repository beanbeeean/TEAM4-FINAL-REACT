import React, { useEffect, useState } from "react";
import styles from "../../css/common/Sidebar.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./LoginModal";
import { userLogout } from "../../../redux/user/slices/userSlice";
import { bookActions } from "../../../redux/book/slices/bookSlice";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { commonActions } from "../../../redux/common/slices/commonSlice";
import { logout } from "./login/APIUtils";

const Sidebar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(1);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.flag);
  const { mainMenu } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userLogout());
    // logout()
    // .then(response => {
    //   console.error('response: ', response);
    // })
    // .catch(error => {
    //   console.error('Error fetching data: ', error);
    // });
  };

  const movePage = (num) => {
    // setCurrentMenu(num);
    switch (num) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/reservation");
        break;
      case 3:
        dispatch(bookActions.fetchSearchBook({ keyword: "" }));
        dispatch(commonActions.setBookMenu("all"));
        navigate("/checkout_books");
        break;
      case 4:
        dispatch(communityActions.fetchSearchCommunity({ keyword: "" }));
        navigate("/community");
        break;
      case 5:
        navigate("/mypage");
        break;
    }
  };

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setCurrentMenu(mainMenu);
  }, [mainMenu]);
  return (
    <div className={styles.side_bar}>
      {/* <Link to="/"> */}
      <img
        className={styles.logo}
        src="../imgs/user_logo.png"
        onClick={goHome}
      />
      {/* </Link> */}
      <ul className={styles.nav_menu}>
        <li
          onClick={() => movePage(1)}
          className={`${currentMenu == 1 && styles.on}`}
        >
          HOME
        </li>
        <li
          onClick={() => movePage(2)}
          className={`${currentMenu == 2 && styles.on}`}
        >
          RESERVATION
        </li>
        <li
          onClick={() => movePage(3)}
          className={`${currentMenu == 3 && styles.on}`}
        >
          BOOK
        </li>
        <li
          onClick={() => movePage(4)}
          className={`${currentMenu == 4 && styles.on}`}
        >
          COMMUNITY
        </li>
        {user ? (
          <li
            onClick={() => movePage(5)}
            className={`${currentMenu == 5 && styles.on}`}
          >
            MYPAGE
          </li>
        ) : (
          <></>
        )}
      </ul>

      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      {user ? (
        <div className={styles.logout} onClick={() => logOut()}>
          LOGOUT
        </div>
      ) : (
        <div className={styles.logout} onClick={() => setModalShow(true)}>
          LOGIN
        </div>
      )}
    </div>
  );
};

export default Sidebar;
