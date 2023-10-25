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
import StudyRoom from "./user/pages/reservation/StudyRoom";
import SearchMain from "./user/pages/common/SearchMain";
import CheckoutList from "./user/pages/book/CheckoutList";
import Board from "./user/pages/community/Board";
import BoardDetail from "./user/pages/community/BoardDetail";
import BoardWrite from "./user/pages/community/BoardWrite";
import CartPayConfirm from "./admin/pages/book/cart/CartPayConfirm";
import MypageModal from "./user/components/mypage/MypageModal";
import AdminLogin from "./admin/pages/common/AdminLogin";
import AdminCreateAccount from "./admin/pages/common/AdminCreateAccount";
import Admin from "./admin/pages/common/Admin";

function App() {
  console.log(window.location.pathname.includes("/admin"));
  return (
    <div id="wrap">
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
            {/* <ChatModal /> */}
            <MypageModal />
            <Header />
            <div className="section_area">
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/books" element={<BookList />} /> */}
                {/* <Route path="/books/:id" element={<BookDetail />} /> */}
                <Route path="/board" element={<Board />} />
                <Route path="/board/:id" element={<BoardDetail />} />
                <Route path="/board_write" element={<BoardWrite />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/confirm" element={<CartPayConfirm />} />
                <Route path="/checkout_books" element={<CheckoutList />} />
                <Route
                  path="/checkout_books/:id"
                  element={<CheckoutDetail />}
                />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/reservation" element={<Reservation />} />

                <Route path="/search" element={<SearchMain />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
