import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../user/pages/common/Home";
import Sidebar from "../user/components/common/Sidebar";
import Header from "../user/components/common/Header";
import CheckoutDetail from "../user/pages/book/CheckoutDetail";
import MyPage from "../user/pages/common/MyPage";
import Reservation from "../user/pages/reservation/Reservation";
import SearchMain from "../user/pages/common/SearchMain";
import CheckoutList from "../user/pages/book/CheckoutList";
import Community from "../user/pages/community/Community";
import CommunityDetail from "../user/pages/community/CommunityDetail";
import CommunityWrite from "../user/pages/community/CommunityWrite";
import AdminLogin from "../admin/pages/common/AdminLogin";
import AdminCreateAccount from "../admin/pages/common/AdminCreateAccount";
import Admin from "../admin/pages/common/Admin";
import OAuth2RedirectHandler from "../user/components/common/login/OAuth2RedirectHandler";

import { useDispatch, useSelector } from "react-redux";
import CommunityModify from "../user/pages/community/CommunityModify";
import ChatModal from "../user/components/chat/ChatModal";
import { logout } from "../user/components/common/login/APIUtils";
import { userLogout } from "../redux/user/slices/userSlice";

const Authorization = () => {
  
  const authorization = useSelector((state) => state.user.userDto.u_role);

  const dispatch = useDispatch();

  const admin = () => {
    if(authorization==="ROLE_USER"){
      logout()
      .then(response => {
        dispatch(userLogout())
      })
      .catch(error => {
      });
    } else if(authorization==="ROLE_ADMIN" || authorization==="ROLE_SUPER"){
      return true;
    }
    return false;
  }

  const user = () => {
    if(authorization==="ROLE_ADMIN" || authorization==="ROLE_SUPER"){
      logout()
      .then(response => {
        dispatch(userLogout())
      })
      .catch(error => {
      });
    } else if(authorization==="ROLE_USER"){
      return true;
    }
    return false;
  }

  return (
    <>
    {/* <Header />
      <Nav />*/}
          {/* <Header />
      <Nav />*/}
          {window.location.pathname.includes("/admin") ? (
            <>
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/create_account"
                  element={<AdminCreateAccount />}
                />
                <Route path="/admin/management" element={admin() ? <Admin /> : <AdminLogin />}  />
              </Routes>
            </>
          ) : (
            <div id="user_wrap">
              <Sidebar />
              <div id="section">
                <ChatModal />
                <Header />
                <div className="section_area">
                  <Routes>
                    <Route path="/" element={user() ? <Home />:<Home />} />
                    {/* <Route path="/books" element={<BookList />} /> */}
                    {/* <Route path="/books/:id" element={<BookDetail />} /> */}
                    <Route path="/community" element={<Community />} />
                    <Route
                      path="/community/:id"
                      element={<CommunityDetail />}
                    />
                    <Route
                      path="/community_write"
                      element={<CommunityWrite />}
                    />
                    <Route
                      path="/community_modify/:id"
                      element={<CommunityModify />}
                    />

                    <Route path="/checkout_books" element={<CheckoutList />} />
                    <Route
                      path="/checkout_books/:id"
                      element={<CheckoutDetail />}
                    />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/reservation" element={<Reservation />} />

                    <Route path="/search/:keyword" element={<SearchMain />} />

                    <Route
                      path="/oauth2/redirect"
                      element={<OAuth2RedirectHandler />}
                    ></Route>
                  </Routes>
                </div>
              </div>
            </div>
          )}
    </>
  );
};

export default Authorization;
