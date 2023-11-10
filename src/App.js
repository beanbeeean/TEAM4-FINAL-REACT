import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./user/pages/common/Home";
import Sidebar from "./user/components/common/Sidebar";
import Header from "./user/components/common/Header";
import Cart from "./admin/pages/book/cart/Cart";
import CheckoutDetail from "./user/pages/book/CheckoutDetail";
import MyPage from "./user/pages/common/MyPage";
import Reservation from "./user/pages/reservation/Reservation";
import SearchMain from "./user/pages/common/SearchMain";
import CheckoutList from "./user/pages/book/CheckoutList";
import Community from "./user/pages/community/Community";
import CommunityDetail from "./user/pages/community/CommunityDetail";
import CommunityWrite from "./user/pages/community/CommunityWrite";
import CartPayConfirm from "./admin/pages/book/cart/CartPayConfirm";
import AdminLogin from "./admin/pages/common/AdminLogin";
import AdminCreateAccount from "./admin/pages/common/AdminCreateAccount";
import Admin from "./admin/pages/common/Admin";
import OAuth2RedirectHandler from "./user/components/common/login/OAuth2RedirectHandler";
import { store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import CommunityModify from "./user/pages/community/CommunityModify";
import ChatModal from "./user/components/chat/ChatModal";

function App() {
  const persistor = persistStore(store);

  console.log(window.location.pathname.includes("/admin"));

  return (
    <div id="wrap">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
                <Route path="/admin/management" element={<Admin />} />
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
                    <Route path="/" element={<Home />} />
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
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/cart/confirm" element={<CartPayConfirm />} />
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
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
