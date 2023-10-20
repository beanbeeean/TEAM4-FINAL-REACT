import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/include/Header";
import Footer from "./components/include/Footer";
import Nav from "./components/include/Nav";
import StudyRoom from "./components/reservation/study/StudyRoom";
import ReadRoom from "./components/reservation/read/ReadRoom";

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readroom" element={<ReadRoom />} />
        <Route path="/studyroom" element={<StudyRoom />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
