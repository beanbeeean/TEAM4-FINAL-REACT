import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReadRoom from "./components/study/ReadRoom";
import Header from "./components/include/Header";
import Footer from "./components/include/Footer";
import Nav from "./components/include/Nav";

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readroom" element={<ReadRoom />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
