import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieData from "./pages/MovieData";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ActorPage from "./pages/ActorPage";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Header />      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movieData" element={<MovieData />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/actorPage" element={<ActorPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
