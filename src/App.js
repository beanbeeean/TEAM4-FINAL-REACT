import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/include/Header";
import Footer from "./components/include/Footer";
import Nav from "./components/include/Nav";
import Board from "./pages/board/Board";
import BoardDetail from "./pages/board/BoardDetail";
import BoardWrite from "./pages/board/BoardWrite";

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/board_write" element={<BoardWrite />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
