import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/include/Header";
import Footer from "./components/include/Footer";
import Nav from "./components/include/Nav";
import ChatModal from "./components/include/ChatModal";

function App() {
  return (
    <div id="wrap">
      <Header />
      <Nav />
      <ChatModal />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
