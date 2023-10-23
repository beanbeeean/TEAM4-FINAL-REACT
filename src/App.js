import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/include/Header";
import Footer from "./components/include/Footer";
import Nav from "./components/include/Nav";
import ChatModal from "./components/include/ChatModal";
import BookList from "./pages/book/BookList";
import BookDetail from "./pages/book/BookDetail";
import Cart from "./pages/book/pay/Cart";
import CartPayConfirm from "./pages/book/pay/CartPayConfirm";
import BoardWrite from "./pages/board/BoardWrite";
import Board from "./pages/board/Board";
import BoardDetail from "./pages/board/BoardDetail";
import CheckoutList from "./pages/user/book_checkout/CheckoutList";
import CheckoutDetail from "./pages/user/book_checkout/CheckoutDetail";
import MyPage from "./pages/MyPage";
import Sidebar from "./components/include/Sidebar";
import Reservation from "./components/reservation/Reservation";
import StudyRoom from "./components/reservation/study/components/StudyRoom";

function App() {
  return (
    <div id="wrap">
      {/* <Header />
      <Nav />
      <ChatModal /> */}
      <Sidebar />
      <div id="section">
        <Header />
        <div className="section_area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
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
          </Routes>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
