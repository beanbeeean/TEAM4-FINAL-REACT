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

function App() {
  return (
    <div id="wrap">
      {/* <Header />
      <Nav />*/}

      <Sidebar />
      <div id="section">
        {/* <ChatModal /> */}
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
            <Route path="/checkout_books/:id" element={<CheckoutDetail />} />
            <Route path="/mypage" element={<MyPage />} />

            <Route path="/test" element={<StudyRoom />} />
            <Route path="/reservation" element={<Reservation />} />

            <Route path="/search" element={<SearchMain />} />
          </Routes>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
