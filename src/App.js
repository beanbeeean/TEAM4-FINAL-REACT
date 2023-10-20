import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/include/Header";
import Footer from "./components/include/Footer";
import Nav from "./components/include/Nav";
import BookList from "./pages/book/BookList";
import BookDetail from "./pages/book/include/BookDetail";
import Cart from "./pages/book/pay/Cart";
import CartPayConfirm from "./pages/book/pay/CartPayConfirm";

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/confirm" element={<CartPayConfirm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
